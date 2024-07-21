import { runTests } from "..";
import algorithms from "../algorithms";

function listAlgorithms() {
  console.log("Available algorithms:");
  algorithms
    .map((algorithm) => algorithm.name)
    .forEach((name) => console.log(name));
}

function printUsage() {
  console.log("Usage: npm start <algorithm-name>");
}

function main() {
  const args = process.argv;

  if (args.length < 3 || args[2] === "--help") {
    printUsage();
    listAlgorithms();
    process.exit(0);
  }

  const algorithmName = args[2];

  const algorithm = algorithms.find(
    (algorithm) => algorithm.name === algorithmName,
  );

  if (!algorithm) {
    console.error(`Algorithm "${algorithmName}" not found`);
    listAlgorithms();
    process.exit(1);
  }

  runTests(algorithm);
}

main();
