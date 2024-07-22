import { AlgorithmCLI } from "../cli";
import { CompareFunction } from "..";

function merge<T>(
  A: T[],
  p: number,
  q: number,
  r: number,
  compare: CompareFunction<T, number>,
  ascending: boolean,
) {
  const n1 = q - p + 1;
  const n2 = r - q;
  const L = A.slice(p, q + 1);
  const R = A.slice(q + 1, r + 1);

  let i = 0;
  let j = 0;
  let k = p;

  while (i < n1 && j < n2) {
    if (
      (ascending && compare(L[i], R[j]) <= 0) ||
      (!ascending && compare(L[i], R[j]) >= 0)
    ) {
      A[k] = L[i];
      i++;
    } else {
      A[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    A[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    A[k] = R[j];
    j++;
    k++;
  }
}

function mergeSort<T>(
  A: T[],
  p: number,
  r: number,
  compare: CompareFunction<T, number>,
  ascending: boolean,
): T[] {
  if (p < r) {
    const q = Math.floor((p + r) / 2);
    mergeSort(A, p, q, compare, ascending);
    mergeSort(A, q + 1, r, compare, ascending);
    merge(A, p, q, r, compare, ascending);
  }
  return A;
}

function implementation<T>(
  input: T[],
  compare: CompareFunction<T, number> = defaultCompare,
  ascending: boolean = true,
): T[] {
  const arr = [...input];
  return mergeSort(arr, 0, arr.length - 1, compare, ascending);
}

function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function parseArgs(args: string[]): {
  input: string[];
  compareFunction?: CompareFunction<string, number>;
  ascending: boolean;
} {
  if (args.length < 1) {
    throw new Error(
      "Merge sort expects at least one argument: a comma-separated list of items to sort",
    );
  }

  const input = args[0].split(",").map((item) => item.trim());
  let compareFunction: CompareFunction<string, number> | undefined;
  let ascending = true;

  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith("compare=")) {
      const compareType = args[i].split("=")[1];
      switch (compareType) {
        case "numeric":
          compareFunction = (a, b) => Number(a) - Number(b);
          break;
        case "lexicographic":
          compareFunction = (a, b) => a.localeCompare(b);
          break;
        default:
          throw new Error(`Unknown compare function: ${compareType}`);
      }
    } else if (args[i] === "desc") {
      ascending = false;
    }
  }

  return { input, compareFunction, ascending };
}

function usage() {
  console.log("Usage: npm start merge-sort <items> [compare=<type>] [desc]");
  console.log("  <items>: Comma-separated list of items to sort");
  console.log(
    "  compare: Optional compare function type (numeric, lexicographic)",
  );
  console.log("  desc: Optional flag to sort in descending order");
  console.log("Examples:");
  console.log("  npm start merge-sort 5,2,8,1,9");
  console.log("  npm start merge-sort 5,2,8,1,9 compare=numeric");
  console.log(
    "  npm start merge-sort apple,zebra,banana,yellow compare=lexicographic desc",
  );
}

const algorithm: AlgorithmCLI<string[], string[], string, number> = {
  name: "merge-sort",
  algorithm: implementation,
  parseArgs,
  usage,
};

export default algorithm;
