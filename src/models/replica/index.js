import pick from 'lodash/pick';

import model from './model';

/**
 * Create a Replica object
 */
export default props => Object.freeze(pick(props, Object.keys(model.name)));
