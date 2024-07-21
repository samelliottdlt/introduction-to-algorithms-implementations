import { AlgorithmWithTests } from "..";

function merge<T>(A: T[], p: number, q: number, r: number) {
  const n1 = q - p + 1;
  const n2 = r - q;
  const L = new Array(n1 + 1);
  const R = new Array(n2 + 1);
  for (let i = 0; i <= n1; i++) {
    L[i] = A[p + i - 1];
  }
  for (let j = 0; j <= n2; j++) {
    R[j] = A[q + j];
  }
  L[n1 + 1] = Infinity;
  R[n2 + 1] = Infinity;
  let i = 1;
  let j = 1;
  for (let k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      A[k] = L[i];
      i = i + 1;
    } else {
      A[k] = R[j];
      j = j + 1;
    }
  }
}

function mergeSort<T>(A: T[], p: number, r: number): T[] {
  if (p < r) {
    const q = Math.floor((p + r) / 2);
    mergeSort(A, p, q);
    mergeSort(A, q + 1, r);
    merge(A, p, q, r);
  }
  return A;
}

function implementation(input: number[]): number[] {
  return mergeSort(input, 0, input.length - 1);
}

const algorithm: AlgorithmWithTests<number[], number[]> = {
  name: "merge-sort",
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
