const axios = require('axios');
const config = require('../config/config');

/**
 * emit event to the event bus
 * @param {Object} payload - Event payload
 * @returns {Promise<QueryResult>}
 */
const emitEvent = async (payload) => {
  return axios.post(config.eventBusUrl, { ...payload });
};

module.exports = {
  emitEvent,
};
