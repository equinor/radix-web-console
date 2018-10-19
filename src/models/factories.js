/**
 * This file exports factories of models; these have a schema that the Web
 * Console assumes to be correct. This is basically the Web Console end of the
 * API contract. Objects generated with these factories are correct for Web
 * Console usage.
 */

import pick from 'lodash/pick';

/**
 * Create an Application object that obeys the contract with the API server
 * @param {Object} props Properties of the application object
 */
export const applicationFactory = props =>
  Object.freeze(
    pick(props, 'adGroups', 'name', 'publicKey', 'repository', 'sharedSecret')
  );
