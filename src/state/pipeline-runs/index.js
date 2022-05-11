import { makeLocalGetter } from '../../utils/object';
import get from 'lodash/get';

const localGetter = makeLocalGetter('pipelineRuns');

export const getPipelineRuns = (state) => get(state, 'pipelineRuns', []);
