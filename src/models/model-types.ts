type TestDescriptorType = {
  __testDescription: string;
  __testIsInvalidSample?: boolean;
};

type ToJsonType<T> = T extends undefined | null
  ? null
  : T extends Date
  ? string
  : T extends object
  ? RawModel<T>
  : T extends boolean | number | string | unknown
  ? T
  : string;

export type TestDependencyDataType<T = unknown> = Array<TestDescriptorType & T>;

export type RawModel<T> = {
  [K in keyof T]: ToJsonType<T[K]>;
};

export type ModelNormalizerType<T = unknown, P = T> = (
  props: P | RawModel<P> | unknown
) => T;
