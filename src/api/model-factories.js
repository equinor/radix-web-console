import pick from 'lodash/pick';

/**
 * Create an Application object that obeys the contract with the API server
 * @param {Object} props Properties of the application object
 */
export const applicationFactory = props =>
  Object.freeze(
    pick(props, 'adGroups', 'publicKey', 'repository', 'sharedSecret')
  );
