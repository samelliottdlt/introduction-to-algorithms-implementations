import { AlgorithmWithTests } from "..";

function implementation(input: number[]): number[] {
  return input.sort((a, b) => a - b);
}

const algorithm: AlgorithmWithTests<number[], number[]> = {
  name: "built-in",
  algorithm: implementation,
  tests: [
    { input: [3, 2, 1], expected: [1, 2, 3] },
    { input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
    { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { input: [1], expected: [1] },
    { input: [], expected: [] },
  ],
  cloneInput: (input) => [...input],
};

export default algorithm;
