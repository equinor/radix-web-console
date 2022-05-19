import { makeLocalGetter } from '../../utils/object';
import get from 'lodash/get';

const localGetter = makeLocalGetter('pipelineRunTaskSteps');

export const getPipelineRunTaskSteps = (state) =>
  get(state, 'pipelineRunTaskSteps', []);
