type TestDescriptorType = {
  __testDescription: string;
  __testIsInvalidSample?: boolean;
};

export type TestDependencyDataType<T = unknown> = Array<TestDescriptorType & T>;

export type ModelNormalizerType<T = unknown, P = T> = (
  props: P | unknown
) => Readonly<T>;
