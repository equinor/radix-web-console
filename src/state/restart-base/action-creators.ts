import { ActionType, makeActionCreator } from '../state-utils/action-creators';

export const restartActions = <
  TPayload = never,
  TMeta = Record<string, unknown>,
  TArgs extends Array<unknown> = Array<unknown>,
>(
  actionPrefix: string,
  ...argNames: Array<keyof Pick<ActionType, 'error' | 'payload'> | keyof TMeta>
) => ({
  /**
   * Action creator for requesting restart of a resource
   * @param {Array} argNames Array of arguments for restart request
   */
  restartRequest: makeActionCreator<never, TMeta, TArgs>(
    `${actionPrefix}_RESTART_REQUEST`,
    ...argNames
  ),

  /**
   * Action creator for marking a restart as complete
   */
  restartConfirm: makeActionCreator<TPayload, never, [payload: TPayload]>(
    `${actionPrefix}_RESTART_COMPLETE`,
    'payload'
  ),

  /**
   * Action creator for marking a restart as failed
   * @param {string} error The error message
   */
  restartFail: makeActionCreator<never, never, [error: string]>(
    `${actionPrefix}_RESTART_FAIL`,
    'error'
  ),
});
