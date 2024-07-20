import { runTests, Flags } from "..";
import algorithms from "../algorithms";

function listAlgorithms() {
  console.log("Available algorithms:");
  algorithms
    .map((algorithm) => algorithm.name)
    .forEach((name) => console.log(name));
}

function parseFlags(args: string[]): Flags {
  const flags: Flags = {};
  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const flagName = arg.slice(2);
      if (flagName === "showInputOutputOnPass") {
        flags.showInputOutputOnPass = true;
      } else {
        console.warn(`Unknown flag: ${flagName}`);
      }
    }
  }

  return flags;
}

function printUsage() {
  console.log("Usage: npm start <algorithm-name> [flags]");
  console.log("Flags:");
  console.log(
    "  --showInputOutputOnPass  Show input and output for passing tests",
  );
}

function main() {
  const args = process.argv;

  if (args.length < 3 || args[2] === "--help") {
    printUsage();
    listAlgorithms();
    process.exit(0);
  }

  const algorithmName = args[2];
  const flags = parseFlags(args);

  const algorithm = algorithms.find(
    (algorithm) => algorithm.name === algorithmName,
  );

  if (!algorithm) {
    console.error(`Algorithm "${algorithmName}" not found`);
    listAlgorithms();
    process.exit(1);
  }

  runTests(algorithm, flags);
}

main();
