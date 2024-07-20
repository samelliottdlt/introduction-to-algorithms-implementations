// src/cli/runAllTests.ts

import algorithms from "../algorithms";

function runAllTests() {
  console.log("Running tests for all algorithms\n");

  let totalTests = 0;
  let passedTests = 0;

  algorithms.forEach((algorithm) => {
    console.log(`Testing ${algorithm.name}:`);

    let algorithmPassedTests = 0;
    algorithm.tests.forEach((test, index) => {
      const result = algorithm.algorithm(test.input);
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);

      if (passed) {
        algorithmPassedTests++;
        passedTests++;
      }

      console.log(`  Test ${index + 1}: ${passed ? "PASSED" : "FAILED"}`);
      if (!passed) {
        console.log(`    Input:    ${JSON.stringify(test.input)}`);
        console.log(`    Expected: ${JSON.stringify(test.expected)}`);
        console.log(`    Got:      ${JSON.stringify(result)}`);
      }

      totalTests++;
    });

    console.log(
      `  ${algorithmPassedTests}/${algorithm.tests.length} tests passed\n`,
    );
  });

  console.log(`Overall: ${passedTests}/${totalTests} tests passed`);

  if (passedTests < totalTests) {
    process.exit(1);
  }
}

runAllTests();
