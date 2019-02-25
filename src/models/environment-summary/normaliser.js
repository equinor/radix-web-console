import pick from 'lodash/pick';

import model from '.';

/**
 * Create an Environment Summary object
 */
export default props => Object.freeze(pick(props, Object.keys(model)));
