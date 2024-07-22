import { AlgorithmCLI } from "../cli";
import { CompareFunction } from "..";

function implementation<T>(
  input: T[],
  compare: CompareFunction<T, number> = defaultCompare,
  ascending: boolean = true,
): T[] {
  const arr = [...input];
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (
      j >= 0 &&
      (ascending ? compare(arr[j], key) > 0 : compare(arr[j], key) < 0)
    ) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
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
      "Insertion sort expects at least one argument: a comma-separated list of items to sort",
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
  console.log(
    "Usage: npm start insertion-sort <items> [compare=<type>] [desc]",
  );
  console.log("  <items>: Comma-separated list of items to sort");
  console.log(
    "  compare: Optional compare function type (numeric, lexicographic)",
  );
  console.log("  desc: Optional flag to sort in descending order");
  console.log("Examples:");
  console.log("  npm start insertion-sort 5,2,8,1,9");
  console.log("  npm start insertion-sort 5,2,8,1,9 compare=numeric");
  console.log(
    "  npm start insertion-sort apple,zebra,banana,yellow compare=lexicographic desc",
  );
}

const algorithm: AlgorithmCLI<string[], string[], string, number> = {
  name: "insertion-sort",
  algorithm: implementation,
  parseArgs,
  usage,
};

export default algorithm;
