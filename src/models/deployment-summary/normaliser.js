import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Deployment Summary object
 */
export default props => Object.freeze(pick(props, Object.keys(model)));
