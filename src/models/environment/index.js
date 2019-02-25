import pick from 'lodash/pick';

import model from '.';

/**
 * Create an Environment object
 */
export default props =>
  Object.freeze(
    Object.assign(
      {
        activeDeployment: null,
        deployments: [],
        secrets: [],
      },
      pick(props, Object.keys(model))
    )
  );
