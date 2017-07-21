const _keys = require('lodash.keys');
const _omit = require('lodash.omit');
const _difference = require('lodash.difference');
const _get = require('lodash.get');

/**
 * Check if in object are unknown properties
 * @param {object} options
 * @param {object} options.schema - full chema to validate
 * @param {object} options.data - object which validator should validate
 * @param {object} options.config - object with validator configuration
 */
module.exports = (options, callback) => {
  const { schema, data, config } = options;

  const dataKeys = _keys(_omit(data, ['_']));
  const schemaKeys = _keys(_omit(schema, ['_']));
  const unknown = _difference(dataKeys, schemaKeys);
  const unknownPresent = unknown.length > 0;
  const allowUnknown = _get(config, 'v', false);

  if (unknownPresent && !allowUnknown) {
    return callback(null, {
      check: false,
      message: 'error.validate.unknown-properties',
      details: unknown,
    });
  }
  return callback(null, {
    check: true,
  });
};
