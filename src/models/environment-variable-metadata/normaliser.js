import pick from 'lodash/pick';
import model from '.';

/**
 * Create a EnvVarMetadata object
 */
export const normaliser = (props) => {
  const metadata = pick(props, Object.keys(model));
  return Object.freeze(metadata);
};

export default normaliser;
