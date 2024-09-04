'use strict';

/**
 * contact-group controller
 */

const collectionType = 'contact-group'

const schema = require(`../content-types/${collectionType}/schema.json`);
const createPopulatedController = require("../../../helpers/populate");

module.exports = createPopulatedController(`api::${collectionType}.${collectionType}`, schema);