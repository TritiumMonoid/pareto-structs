import SortedCollection from "../../src/sorted-collection";
import RedBlackTree from "../../src/sorted-collection/red-black-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty containsAll empty test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree empty containsAll 0 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  b = b.union([0]);
  expect(a.containsAll(b)).toBe(false);
});

test("RedBlackTree 0 containsAll empty test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 0, 2, 1 containsAll empty test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0, 2, 1]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 0, 2, 1 containsAll 0 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0, 2, 1]);
  b = b.union([0]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 0, 2, 1 containsAll undefined test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0, 2, 1]);
  b = b.union([undefined]);
  expect(a.containsAll(b)).toBe(false);
});

test("RedBlackTree 0, 2, 1 containsAll 0, 0 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0, 2, 1]);
  b = b.union([0, 0]);
  expect(a.containsAll(b)).toBe(false);
});

test("RedBlackTree 0, 2, 1 containsAll 1, 2, 0 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0, 2, 1]);
  b = b.union([1, 2, 0]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 0, 2, 1, 3 containsAll 3, 1 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0, 2, 1, 3]);
  b = b.union([3, 1]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 0, 2, 1, 3 containsAll 3, 1 desc test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(desc);
  a = a.union([0, 2, 1, 3]);
  b = b.union([3, 1]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 0, 2, 1, 3 containsAll 3, 1, 7 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([0, 2, 1, 3]);
  b = b.union([3, 1, 7]);
  expect(a.containsAll(b)).toBe(false);
});

test("RedBlackTree 1, 1, 0, 0, 2, 2 containsAll 2, 1, 0 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([2, 1, 0]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 1, 1, 0, 0, 2, 2 containsAll 0, 0 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([0, 0]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 1, 1, 0, 0, 2, 2 containsAll 0, 0, 0 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([0, 0, 0]);
  expect(a.containsAll(b)).toBe(false);
});

test("RedBlackTree 1, 1, 0, 0, 2, 2 containsAll 0, 0, 1, 1, 2, 2 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([0, 0, 1, 1, 2, 2]);
  expect(a.containsAll(b)).toBe(true);
});

test("RedBlackTree 1, 1, 0, 0, 2, 2 containsAll 2, 0, 0, 1, 1, 2, 2 test", function() {
  let a = RedBlackTree.create<number>(asc);
  let b = RedBlackTree.create<number>(asc);
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([2, 0, 0, 1, 1, 2, 2]);
  expect(a.containsAll(b)).toBe(false);
});
