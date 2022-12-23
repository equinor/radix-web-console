type TestDescriptorType = {
  __testDescription: string;
  __testIsInvalidSample?: boolean;
};

type ToString<T> = T extends Date
  ? string
  : T extends object
  ? RawModel<T>
  : string;

export type TestDependencyDataType<T = unknown> = Array<TestDescriptorType & T>;

export type RawModel<T> = {
  [K in keyof T]: ToString<T[K]>;
};

export type ModelNormalizerType<T = unknown, P = T> = (
  props: P | RawModel<P> | unknown
) => Readonly<T>;
