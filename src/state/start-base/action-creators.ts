import { ActionType, makeActionCreator } from '../state-utils/action-creators';

export const startActions = <
  TPayload = never,
  TMeta = Record<string, unknown>,
  TArgs extends Array<unknown> = Array<unknown>,
>(
  actionPrefix: string,
  ...argNames: Array<keyof Pick<ActionType, 'error' | 'payload'> | keyof TMeta>
) => ({
  /**
   * Action creator for requesting start of a resource
   * @param {Array} argNames Array of arguments for start request
   */
  startRequest: makeActionCreator<never, TMeta, TArgs>(
    `${actionPrefix}_START_REQUEST`,
    ...argNames
  ),

  /**
   * Action creator for marking a start as complete
   */
  startConfirm: makeActionCreator<TPayload, never, [payload: TPayload]>(
    `${actionPrefix}_START_COMPLETE`,
    'payload'
  ),

  /**
   * Action creator for marking a start as failed
   * @param {string} error The error message
   */
  startFail: makeActionCreator<never, never, [error: string]>(
    `${actionPrefix}_START_FAIL`,
    'error'
  ),
});
