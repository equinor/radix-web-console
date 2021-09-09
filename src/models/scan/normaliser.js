import pick from 'lodash/pick';

import model from '.';
import vulnerabilitySummaryNormaliser from '../vulnerability-summary/normaliser';

/**
 * Create a Port object
 */
export const normaliser = (props) => {
  const scan = pick(props, Object.keys(model));
  scan.vulnerabilities = scan.vulnerabilities
    ? vulnerabilitySummaryNormaliser(scan.vulnerabilities)
    : {};
  return Object.freeze(scan);
};

export default normaliser;
