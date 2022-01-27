import { ScanModel } from '.';

import { ModelNormaliserType } from '../model-types';
import { VulnerabilitySummaryModelNormaliser } from '../vulnerability-summary/normaliser';

/**
 * Create a ScanModel object
 */
export const ScanModelNormaliser: ModelNormaliserType<ScanModel> = (props) => {
  const normalised = { ...(props as ScanModel) };
  normalised.vulnerabilities = VulnerabilitySummaryModelNormaliser(
    normalised.vulnerabilities
  );

  return Object.freeze(normalised);
};
