import { pick } from 'lodash';

import model from '.';

import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a ScheduledJobSummaryModel object
 */
export const normaliser = (props) => {
  const normalized = pick(props, Object.keys(model));

  const created = new Date(normalized.created);
  const ended = new Date(normalized.ended);
  const started = new Date(normalized.started);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;
  normalized.created = isNaN(created?.valueOf()) ? undefined : created;
  normalized.replicaList = normalized.replicaList?.map(
    ReplicaSummaryModelNormalizer
  );

  return Object.freeze(normalized);
};

export default normaliser;
