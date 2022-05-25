type ActionCreatorArg =
  | string
  | number
  | boolean
  | {}
  | Array<ActionCreatorArg>;
export type ActionCreatorObj = { type: string } & {
  [key: string]: ActionCreatorArg;
};

export function makeActionCreator(
  type: string,
  ...argNames: Array<string>
): (...args: Array<ActionCreatorArg>) => ActionCreatorObj {
  return function (...args) {
    return argNames.reduce(
      (obj, _, i) => {
        obj[argNames[i]] = args[i];
        return obj;
      },
      { type }
    );
  };
}
