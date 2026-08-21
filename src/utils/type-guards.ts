export const isArrayOfStrings = (variable: unknown): variable is string[] => {
  return Array.isArray(variable) && variable.every((item) => typeof item === 'string')
}
