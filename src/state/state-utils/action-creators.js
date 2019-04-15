export const makeActionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((_, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
