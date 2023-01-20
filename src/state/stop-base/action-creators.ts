import { ActionType, makeActionCreator } from '../state-utils/action-creators';

export const stopActions = <
  TPayload = never,
  TMeta = Record<string, unknown>,
  TArgs extends Array<unknown> = Array<unknown>
>(
  actionPrefix: string,
  ...argNames: Array<keyof Pick<ActionType, 'error' | 'payload'> | keyof TMeta>
) => ({
  /**
   * Action creator for requesting stop of a resource
   * @param {Array} argNames Array of arguments for stop request
   */
  stopRequest: makeActionCreator<never, TMeta, TArgs>(
    `${actionPrefix}_STOP_REQUEST`,
    ...argNames
  ),

  /**
   * Action creator for marking a stop as complete
   */
  stopConfirm: makeActionCreator<TPayload, never, [payload: TPayload]>(
    `${actionPrefix}_STOP_COMPLETE`,
    'payload'
  ),

  /**
   * Action creator for marking a stop as failed
   * @param {string} error The error message
   */
  stopFail: makeActionCreator<never, never, [error: string]>(
    `${actionPrefix}_STOP_FAIL`,
    'error'
  ),
});
