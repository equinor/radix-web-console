import { makeLocalGetter } from '../../utils/object';
import get from 'lodash/get';

const localGetter = makeLocalGetter('pipelineRunTask');

export const getPipelineRunTask = (state) =>
  get(state, 'pipelineRunTask', null);
