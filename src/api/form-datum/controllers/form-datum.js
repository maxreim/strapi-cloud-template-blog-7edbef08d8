'use strict';

/**
 * form-datum controller
 * see https://forum.strapi.io/t/how-to-count-in-rest-api-in-v4/14765/2
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::form-datum.form-datum', {
    count(ctx) {
        var {query} = ctx.request
        return strapi.query('api::form-datum.form-datum').count({where: query.filters});
    }
});