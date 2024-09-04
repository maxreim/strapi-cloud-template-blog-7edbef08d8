const {createCoreController} = require("@strapi/strapi/lib/factories");
const _ = require('lodash');

const populateAttribute = (component) => {
    const [componentDir, componentName] = component.split(".");
    /* Component attributes needs to be explicitly populated */
    const componentAttributes = Object.entries(
        require(`../components/${componentDir}/${componentName}.json`)
            .attributes
    )
    /** Implemented media type */
    const attrPopulates = componentAttributes.reduce(
        (acc, [curr, obj]) => {
            switch (obj.type) {
                case "component":
                    return _.merge(acc, {populate: {[curr]: populateAttribute(obj.component)}});
                case "media":
                    return _.merge(acc, {populate: "*"});
                default:
                    return acc;
            }
        },
        {}
    );
    return _.isEmpty(attrPopulates) ? {populate: "*"} : attrPopulates
}

const getPopulateFromSchema = function (schema, depth = 0) {
    const result = Object.keys(schema.attributes).reduce((currentValue, current) => {
        const attribute = schema.attributes[current];
        if (attribute.type == "component") {
            return {
                ...currentValue,
                [current]: populateAttribute(attribute.component)
            }
        }
        else if (attribute.type == "dynamiczone") {
            let populated = {...currentValue}
            for (entry of attribute.components) {
                entryResult = populateAttribute(entry)
                if (_.isObject(entryResult.populate)) {
                    populated = _.merge(populated, {[current]: entryResult})
                }
            }
            return populated;
        }
        else if (attribute.type == "relation" && depth < 1) {
            const target = attribute.target;
            const targetName = target.substr(5);
            const targetDir = targetName.split(".")[0];
            const schemaPath = `../api/${targetDir}/content-types/${targetDir}/schema.json`;
            const relationSchema = require(schemaPath);
            const populateFromSchema = getPopulateFromSchema(relationSchema, depth + 1)
            return {
                ...currentValue,
                [current]: {populate: populateFromSchema}
            }
        }
        return currentValue;
    }, {});
    return result;
};

function createPopulatedController(uid, schema) {
    return createCoreController(uid, () => {

        return {
            async find(ctx) {
                // deeply populate all attributes with ?populate=*, else retain vanilla functionality
                if (ctx.query.populate === "*") {
                    ctx.query = {
                        ...ctx.query,
                        populate: getPopulateFromSchema(schema),
                    };
                }
                return await super.find(ctx);
            },
            async findOne(ctx) {
                if (ctx.query.populate === "*") {
                    ctx.query = {
                        ...ctx.query,
                        populate: getPopulateFromSchema(schema),
                    };
                }
                return await super.findOne(ctx);
            },
        };
    });
}

module.exports = createPopulatedController;
