import { PayloadAction } from '@reduxjs/toolkit';

type ActionCreatorArg =
  | string
  | number
  | boolean
  | {}
  | Array<ActionCreatorArg>;

type ActionCreatorObj = Omit<ActionType, 'payload'>;

export type ActionMetadata = {
  resource?: string;
  resourceName?: string;
  messageType?: string;
};

export type ActionType<P = never> = PayloadAction<
  P,
  string,
  ActionMetadata,
  string
>;

export function makeActionCreator(
  type: string,
  ...argNames: Array<keyof ActionMetadata | keyof Pick<ActionType, 'error'>>
): (...args: Array<ActionCreatorArg>) => ActionCreatorObj {
  return function (...args) {
    return argNames.reduce<ActionCreatorObj>(
      (obj, _, i) => {
        if (argNames[i] === 'error') {
          // the error is stored on the action
          obj.error = args[i] && String(args[i]);
        } else {
          obj.meta[argNames[i]] = args[i];

          /** @note Use @param meta instead. Here for compatibility */
          obj[argNames[i]] = args[i];
        }

        return obj;
      },
      { type: type, error: null, meta: {} }
    );
  };
}
