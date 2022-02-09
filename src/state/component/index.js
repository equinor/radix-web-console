import { restartState } from '../restart-utils';
import { startState } from '../start-utils';
import { stopState } from '../stop-utils';

export const componentStartState = startState('component');
export const componentStopState = stopState('component');
export const componentRestartState = restartState('component');
