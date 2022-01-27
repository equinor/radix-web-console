type TestDescriptorType = {
  __testDescription: string;
  __testIsInvalidSample?: boolean;
};

export type TestDependencyDataType<T = unknown> = Array<TestDescriptorType & T>;

export type ModelNormaliserType<T = unknown, R = T> = (
  props: T | R | unknown
) => Readonly<R>;
