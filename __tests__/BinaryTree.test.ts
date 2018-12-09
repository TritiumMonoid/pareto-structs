import BinaryTree from "../src/BinaryTree";
import SortedCollection from "../src/SortedCollection";

function comparator(first: number, second: number): number {
  return first - second;
}

function reversed(first: number, second: number): number {
  return second - first;
}

test("Binary tree add 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0]);
});

test("Binary tree add 0, 1, 2 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(2);
  expect(tree.toArray()).toEqual([0, 1, 2]);
});

test("Binary tree add 0, 1, 2 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(2);
  expect(tree.toArray()).toEqual([2, 1, 0]);
});

test("Binary tree add 2, 1, 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0, 1, 2]);
});

test("Binary tree add 2, 1, 0 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([2, 1, 0]);
});

test("Binary tree add 2, 1, 0, -1, -2 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  expect(tree.toArray()).toEqual([-2, -1, 0, 1, 2]);
});

test("Binary tree add 2, 1, 0, -1, -2 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  expect(tree.toArray()).toEqual([2, 1, 0, -1, -2]);
});

test("Binary tree add 2, 1, 0.5, 0, -1, -2, -1.5 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0.5);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.add(-1.5);
  expect(tree.toArray()).toEqual([-2, -1.5, -1, 0, 0.5, 1, 2]);
});

test("Binary tree add 2, 1, 0.5, 0, -1, -2, -1.5 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0.5);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.add(-1.5);
  expect(tree.toArray()).toEqual([2, 1, 0.5, 0, -1, -1.5, -2]);
});

test("Binary tree add 0, 1, 2 remove 1 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(2);
  tree = tree.remove(1);
  expect(tree.toArray()).toEqual([0, 2]);
});

test("Binary tree add 0, 1, 2 remove 1 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(2);
  tree = tree.remove(1);
  expect(tree.toArray()).toEqual([2, 0]);
});

test("Binary tree add 2, 1, 0, -1, -2 remove 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([-2, -1, 1, 2]);
});

test("Binary tree add 2, 1, 0, -1, -2 remove 0 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([2, 1, -1, -2]);
});

test("Binary tree add 2, 1, 0.5, 0, -1, -2, -1.5 remove 1, -1  test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0.5);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.add(-1.5);
  tree = tree.remove(1);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([-2, -1.5, 0, 0.5, 2]);
});

test("Binary tree add 2, 1, 0.5, 0, -1, -2, -1.5 remove 1, -1 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0.5);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.add(-1.5);
  tree = tree.remove(1);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([2, 0.5, 0, -1.5, -2]);
});

test("Binary tree add 0 remove 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([]);
});

test("Binary tree union -2, -1, 0, 1, 2 and -2, -1, 0, 1, 2 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.union(tree);
  expect(tree.toArray()).toEqual([-2, -2, -1, -1, 0, 0, 1, 1, 2, 2]);
});

test("Binary tree union -2, -1, 0, 1, 2 and -2, -1, 0, 1, 2 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.union(tree);
  expect(tree.toArray()).toEqual([2, 2, 1, 1, 0, 0, -1, -1, -2, -2]);
});

test("Binary tree intersection -2, -1, 0, 1, 2 and 0, 1, 2 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  let _tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  let __tree = tree.intersection(_tree);
  expect(__tree.toArray()).toEqual([0, 1, 2]);
});

test("Binary tree intersection -2, -1, 0, 1, 2 and 0, 1, 2 reversed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  let _tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  let __tree = tree.intersection(_tree);
  expect(__tree.toArray()).toEqual([2, 1, 0]);
});

test("Binary tree intersection -2, -1, 0, 1, 2 and 0, 1, 2 mixed test", function() {
  let tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  let _tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  let __tree = tree.intersection(_tree);
  expect(__tree.toArray()).toEqual([2, 1, 0]);
});

test("Binary tree intersection -1, 0, 0, 1, 1, 2, 2 and 0, 0, 1, 2, 3 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(-1);
  tree = tree.add(0);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(1);
  tree = tree.add(2);
  tree = tree.add(2);
  let _tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  _tree = _tree.add(0);
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  _tree = _tree.add(3);
  let __tree = tree.intersection(_tree);
  expect(__tree.toArray()).toEqual([0, 0, 1, 2]);
});

test("Binary tree intersection -1, 0, 0, 1, 1, 2, 2 and 0, 0, 1, 2, 3 mixed test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(-1);
  tree = tree.add(0);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(1);
  tree = tree.add(2);
  tree = tree.add(2);
  let _tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  _tree = _tree.add(0);
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  _tree = _tree.add(3);
  let __tree = tree.intersection(_tree);
  expect(__tree.toArray()).toEqual([0, 0, 1, 2]);
});

test("Binary tree add 1, 0, 2 except 1, 0, 2 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(2);
  let _tree = tree.except(tree);
  expect(_tree.toArray()).toEqual([]);
});

test("Binary tree add 1, 0, 2 except 0, 1, 2 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(2);
  let _tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  let __tree = tree.except(_tree);
  expect(__tree.toArray()).toEqual([]);
});

test("Binary tree add 1, 0, 2 except 0, 1, 2 mixed test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(2);
  let _tree = new BinaryTree<number>(reversed) as SortedCollection<number>;
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  let __tree = tree.except(_tree);
  expect(__tree.toArray()).toEqual([]);
});

test("Binary tree add 1, 0, 2 except 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(2);
  let _tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  _tree = _tree.add(0);
  let __tree = tree.except(_tree);
  expect(__tree.toArray()).toEqual([1, 2]);
});

test("Binary tree add 4, 1, 0, 2, 3 except 7, 0, 1, 2, 5 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(4);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(3);
  let _tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  _tree = _tree.add(7);
  _tree = _tree.add(0);
  _tree = _tree.add(1);
  _tree = _tree.add(2);
  _tree = _tree.add(5);
  let __tree = tree.except(_tree);
  expect(__tree.toArray()).toEqual([3, 4]);
});
