export type Algorithm<I, O> = (input: I) => O;

export type Test<I, O> = {
  input: I;
  expected: O;
};

export type AlgorithmWithTests<I, O> = {
  name: string;
  algorithm: Algorithm<I, O>;
  tests: Test<I, O>[];
  // some algorithms mutate the input, so we need to clone it before running the tests
  cloneInput?: (input: I) => I;
};

export function log(message: string, verbose: boolean) {
  if (verbose) {
    console.log(message);
  }
}

export type Flags = {
  showInputOutputOnPass?: boolean;
  verbose?: boolean;
};

export function runTests<I, O>(
  algorithmWithTests: AlgorithmWithTests<I, O>,
  flags: Flags = {},
): void {
  console.log(`Running tests for ${algorithmWithTests.name}`);

  algorithmWithTests.tests.forEach((test, index) => {
    const input = algorithmWithTests.cloneInput
      ? algorithmWithTests.cloneInput(test.input)
      : test.input;
    const result = algorithmWithTests.algorithm(input);
    const passed = JSON.stringify(result) === JSON.stringify(test.expected);

    console.log(`Test ${index + 1}: ${passed ? "PASSED" : "FAILED"}`);
    if (!passed || flags.showInputOutputOnPass) {
      console.log(`  Input:    ${JSON.stringify(test.input)}`);
      console.log(`  Expected: ${JSON.stringify(test.expected)}`);
      console.log(`  Got:      ${JSON.stringify(result)}`);
    }
  });
}
