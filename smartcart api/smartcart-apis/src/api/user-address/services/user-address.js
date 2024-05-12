'use strict';

/**
 * user-address service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-address.user-address');
