import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Secret object
 */
export default props => Object.freeze(pick(props, Object.keys(model)));
