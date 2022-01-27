import { ScanModel } from '.';
import { VulnerabilitySummaryModelNormaliser } from '../vulnerability-summary/normaliser';

/**
 * Create a ScanModel object
 */
export const ScanModelNormaliser = (
  props: ScanModel | unknown
): Readonly<ScanModel> => {
  const normalised = { ...(props as ScanModel) };
  normalised.vulnerabilities = VulnerabilitySummaryModelNormaliser(
    normalised.vulnerabilities
  );

  return Object.freeze(normalised);
};
