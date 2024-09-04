'use strict';

/**
 * event-group controller
 */

const collectionType = 'event-group'

const schema = require(`../content-types/${collectionType}/schema.json`);
const createPopulatedController = require("../../../helpers/populate");

module.exports = createPopulatedController(`api::${collectionType}.${collectionType}`, schema);