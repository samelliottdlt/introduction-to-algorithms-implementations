class Heap<T> {
  private heap: T[] = [];

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 1 + 1;
  }

  public insert(value: T): void {
    this.heap.push(value);
  }
}

export default Heap;
