import { makeLocalGetter } from '../../utils/object';
import get from 'lodash/get';

const localGetter = makeLocalGetter('pipelineRunTasks');

export const getPipelineRunTasks = (state) =>
  get(state, 'pipelineRunTasks', []);
