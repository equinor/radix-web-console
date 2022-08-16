import { PayloadAction } from '@reduxjs/toolkit';

type ActionCreatorArg =
  | string
  | number
  | boolean
  | {}
  | Array<ActionCreatorArg>;

export type ActionType<
  TPayload = never,
  TMeta = Record<string, unknown>
> = PayloadAction<TPayload, string, never, string> & { meta?: TMeta };

export function makeActionCreator<
  TPayload = never,
  TMeta = Record<string, unknown>
>(
  type: string,
  ...argNames: Array<keyof Pick<ActionType, 'error' | 'payload'> | keyof TMeta>
): (...args: Array<ActionCreatorArg>) => ActionType<TPayload, TMeta> {
  return function (...args) {
    return (argNames as Array<string>).reduce(
      (obj, key, i) => {
        switch (key) {
          case 'error':
          case 'payload':
            // the error and payload are stored on the action itself
            obj[key] = args[i] as string & TPayload;
            break;
          default:
            obj.meta[key] = args[i];

            /** @deprecated Use @param meta instead. Here for compatibility */
            obj[key] = args[i];
            break;
        }

        return obj;
      },
      { type: type, error: null, meta: {} } as ActionType<TPayload, TMeta>
    );
  };
}
