import { restartState } from '../restart-base';
import { startState } from '../start-base';
import { stopState } from '../stop-base';

export const componentStartState = startState('component');
export const componentStopState = stopState('component');
export const componentRestartState = restartState('component');
