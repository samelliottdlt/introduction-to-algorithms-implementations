import { AlgorithmWithTests } from "..";

function exchange(input: number[], i: number, j: number) {
  const temp = input[i];
  input[i] = input[j];
  input[j] = temp;
}

function implementation(input: number[]): number[] {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = input.length - 1; j > i; j--) {
      if (input[j] < input[j - 1]) {
        exchange(input, j, j - 1);
      }
    }
  }
  return input;
}

const algorithm: AlgorithmWithTests<number[], number[]> = {
  name: "bubble-sort",
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
