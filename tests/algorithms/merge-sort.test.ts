import algorithm from "../../src/algorithms/merge-sort";

const mergeSort = algorithm.algorithm;

describe("Merge Sort", () => {
  it("should sort an array of numbers in ascending order", () => {
    expect(mergeSort(["3", "2", "1"], (a, b) => Number(a) - Number(b))).toEqual(
      ["1", "2", "3"],
    );
    expect(
      mergeSort(["5", "4", "3", "2", "1"], (a, b) => Number(a) - Number(b)),
    ).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("should handle an already sorted array", () => {
    expect(
      mergeSort(["1", "2", "3", "4", "5"], (a, b) => Number(a) - Number(b)),
    ).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("should handle an array with a single element", () => {
    expect(mergeSort(["1"])).toEqual(["1"]);
  });

  it("should handle an empty array", () => {
    expect(mergeSort([])).toEqual([]);
  });

  it("should sort an array of strings lexicographically", () => {
    expect(mergeSort(["banana", "apple", "cherry"])).toEqual([
      "apple",
      "banana",
      "cherry",
    ]);
  });

  it("should sort with a custom compare function", () => {
    const customCompare = (a: string, b: string) => b.localeCompare(a); // descending order
    expect(mergeSort(["banana", "apple", "cherry"], customCompare)).toEqual([
      "cherry",
      "banana",
      "apple",
    ]);
  });

  it("should parse arguments correctly", () => {
    const { input, compareFunction } = algorithm.parseArgs([
      "5,2,8,1,9",
      "compare=numeric",
    ]);
    expect(input).toEqual(["5", "2", "8", "1", "9"]);
    expect(mergeSort(input, compareFunction)).toEqual([
      "1",
      "2",
      "5",
      "8",
      "9",
    ]);
  });

  it("should parse arguments with lexicographic compare", () => {
    const { input, compareFunction } = algorithm.parseArgs([
      "banana,apple,cherry",
      "compare=lexicographic",
    ]);
    expect(input).toEqual(["banana", "apple", "cherry"]);
    expect(mergeSort(input, compareFunction)).toEqual([
      "apple",
      "banana",
      "cherry",
    ]);
  });

  it("should use default compare when no compare function is provided", () => {
    const { input, compareFunction } = algorithm.parseArgs(["5,2,8,1,9"]);
    expect(input).toEqual(["5", "2", "8", "1", "9"]);
    expect(mergeSort(input, compareFunction)).toEqual([
      "1",
      "2",
      "5",
      "8",
      "9",
    ]);
  });

  it("should sort in ascending order by default", () => {
    const { input, compareFunction, ascending } = algorithm.parseArgs([
      "5,2,8,1,9",
      "compare=numeric",
    ]);
    expect(mergeSort(input, compareFunction, ascending)).toEqual([
      "1",
      "2",
      "5",
      "8",
      "9",
    ]);
  });

  it("should sort in descending order when specified", () => {
    const { input, compareFunction, ascending } = algorithm.parseArgs([
      "5,2,8,1,9",
      "compare=numeric",
      "desc",
    ]);
    expect(mergeSort(input, compareFunction, ascending)).toEqual([
      "9",
      "8",
      "5",
      "2",
      "1",
    ]);
  });

  it("should sort strings in ascending order", () => {
    const { input, compareFunction, ascending } = algorithm.parseArgs([
      "banana,apple,cherry",
      "compare=lexicographic",
    ]);
    expect(mergeSort(input, compareFunction, ascending)).toEqual([
      "apple",
      "banana",
      "cherry",
    ]);
  });

  it("should sort strings in descending order", () => {
    const { input, compareFunction, ascending } = algorithm.parseArgs([
      "banana,apple,cherry",
      "compare=lexicographic",
      "desc",
    ]);
    expect(mergeSort(input, compareFunction, ascending)).toEqual([
      "cherry",
      "banana",
      "apple",
    ]);
  });
});
