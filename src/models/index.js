/**
 * This file exports models with a schema that the Web Console knows to be
 * correct. This is the Web Console end of the API contract: these objects are
 * correct for Web Console usage.
 *
 * This file provides validation. To create the actual objects, use the
 * functions in `factories.js`
 */

import PropTypes from 'prop-types';

export const ApplicationRegistration = Object.freeze({
  adGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  publicKey: PropTypes.string,
  repository: PropTypes.string.isRequired,
  sharedSecret: PropTypes.string.isRequired,
});
