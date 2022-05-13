import { makeLocalGetter } from '../../utils/object';
import get from 'lodash/get';

const localGetter = makeLocalGetter('pipelineRun');

export const getPipelineRun = (state) => get(state, 'pipelineRun', null);
