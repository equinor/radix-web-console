import pick from 'lodash/pick';

import model from '.';

/**
 * Create an Application Registration object
 */
export default (props) => Object.freeze(pick(props, Object.keys(model)));
