import { Algorithm, CompareFunction } from "..";
import algorithms from "../algorithms";

export type AlgorithmCLI<
  I,
  O,
  T = I extends (infer E)[] ? E : never,
  C = number,
> = {
  name: string;
  algorithm: Algorithm<I, O, T, C>;
  parseArgs: (args: string[]) => {
    input: I;
    compareFunction?: CompareFunction<T, C>;
    ascending: boolean;
  };
  usage: () => void;
};

function listAlgorithms() {
  console.log("Available algorithms:");
  algorithms
    .map((algorithm) => algorithm.name)
    .forEach((name) => console.log(name));
}

function printUsage() {
  console.log("Usage: npm start <algorithm-name> [args...]");
  console.log(
    "Use 'npm start <algorithm-name> --help' for algorithm-specific usage",
  );
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help") {
    printUsage();
    listAlgorithms();
    process.exit(0);
  }

  const algorithmName = args[0];
  const algorithmArgs = args.slice(1);

  const algorithm = algorithms.find(
    (algorithm) => algorithm.name === algorithmName,
  ) as AlgorithmCLI<unknown, unknown, unknown, unknown> | undefined;

  if (!algorithm) {
    console.error(`Algorithm "${algorithmName}" not found`);
    listAlgorithms();
    process.exit(1);
  }

  if (algorithmArgs[0] === "--help") {
    console.log(`Usage for ${algorithm.name}:`);
    algorithm.usage();
    process.exit(0);
  }

  try {
    const { input, compareFunction } = algorithm.parseArgs(algorithmArgs);
    const output = algorithm.algorithm(input, compareFunction);
    console.log("Algorithm output:", output);
  } catch (e) {
    console.error("Error running algorithm", e);
    process.exit(1);
  }
}

main();
