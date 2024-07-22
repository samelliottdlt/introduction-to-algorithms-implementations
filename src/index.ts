export type CompareFunction<T, O> = (a: T, b: T) => O;

export type Algorithm<I, O, T, C> = (
  input: I,
  compare?: CompareFunction<T, C>,
  ascending?: boolean,
) => O;
