import { makeLocalGetter } from '../../utils/object';
import get from 'lodash/get';

const localGetter = makeLocalGetter('pipelineRunTaskStepLog');

export const getPipelineRunTaskStepLog = (state) =>
  get(state, 'pipelineRunTaskStepLog', []);
