import { AlgorithmWithTests } from "..";

function implementation<T>(input: T[]): T[] {
  for (let i = 1; i < input.length; i++) {
    const key = input[i];
    let j = i - 1;
    while (i > 0 && input[j] > key) {
      input[j + 1] = input[j];
      j--;
    }
    input[j + 1] = key;
  }
  return input;
}

const insertionSort: AlgorithmWithTests<number[], number[]> = {
  name: "insertion-sort",
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

export default insertionSort;
