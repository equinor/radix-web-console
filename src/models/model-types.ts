type ToJsonType<T> = T extends undefined | null
  ? null
  : T extends Date
    ? string
    : T extends object
      ? RawModel<T>
      : T extends boolean | number | string | unknown
        ? T
        : string;

export type RawModel<T> = {
  [K in keyof T]: ToJsonType<T[K]>;
};

export type ModelNormalizerType<T = unknown, P = T> = (
  props: P | RawModel<P>
) => T;
