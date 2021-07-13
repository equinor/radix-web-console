import pick from 'lodash/pick';
import model from '.';

/**
 * Create a EnvVar object
 */
export const normaliser = (props) => {
  const envVar = pick(props, Object.keys(model));

  if (
    envVar.metadata != null &&
    envVar.metadata.radixConfigValue != null &&
    envVar.value != null
  ) {
    envVar.isChanged = envVar.metadata.radixConfigValue !== envVar.value;
  }
  envVar.isRadixVariable =
    envVar.value != null &&
    envVar.value != null &&
    envVar.value.startsWith('RADIX_');
  return Object.freeze(envVar);
};

export default normaliser;
