import BinarySearchTreeListIterator from "./BinarySearchTreeListIterator";
import ListIterator from "../../list/ListIterator";
import Node from "./Node";
import MultiMap from "../../multimap";
import { Comparator, Equals, StrictEquality } from "../../../function";
import { Optional } from "../../../data";

export default class BinarySearchTree<K, V> implements MultiMap<K, V> {
  readonly comparator: Comparator<K>;
  readonly equals: Equals<V>;
  readonly root: Node<K, V>;
  readonly count: number;

  private constructor(
    comparator: Comparator<K>,
    equals?: Equals<V>,
    root?: Node<K, V>,
    count?: number
  ) {
    this.comparator = comparator;
    this.equals = equals || StrictEquality;
    this.root = root;
    this.count = count || 0;
  }

  static create<K, V>(
    comparator: Comparator<K>,
    equals?: Equals<V>,
    root?: Node<K, V>,
    count?: number
  ): MultiMap<K, V> {
    return new BinarySearchTree<K, V>(comparator, equals, root, count);
  }

  setRoot(node: Node<K, V>): BinarySearchTree<K, V> {
    return new BinarySearchTree<K, V>(
      this.comparator,
      this.equals,
      node,
      this.count
    );
  }

  setCount(count: number): BinarySearchTree<K, V> {
    return new BinarySearchTree<K, V>(
      this.comparator,
      this.equals,
      this.root,
      count
    );
  }

  private addNode(newNode: Node<K, V>, node: Node<K, V>): Node<K, V> {
    if (!newNode) {
      return node;
    } else if (!node) {
      return newNode;
    } else {
      const comparison = this.comparator(newNode.key, node.key);
      if (comparison > 0) {
        return node.setRight(this.addNode(newNode, node.right));
      } else if (comparison < 0) {
        return node.setLeft(this.addNode(newNode, node.left));
      } else {
        return node.setValues(node.values.concat(newNode.values));
      }
    }
  }

  put(key: K, value: V): MultiMap<K, V> {
    const node = this.addNode(new Node<K, V>(key, [value]), this.root);
    return this.setRoot(node).setCount(this.count + 1);
  }

  putAll(key: K, values: Iterable<V>): MultiMap<K, V> {
    const array = Array.from(values);
    const node = this.addNode(new Node<K, V>(key, array), this.root);
    return this.setRoot(node).setCount(this.count + array.length);
  }

  private replaceNode(
    newNode: Node<K, V>,
    node: Node<K, V>
  ): [Node<K, V>, number] {
    if (!newNode) {
      return [node, 0];
    } else if (!node) {
      return [newNode, newNode.values.length];
    } else {
      const comparison = this.comparator(newNode.key, node.key);
      if (comparison > 0) {
        const [right, diff] = this.replaceNode(newNode, node.right);
        return [node.setRight(right), diff];
      } else if (comparison < 0) {
        const [left, diff] = this.replaceNode(newNode, node.left);
        return [node.setLeft(left), diff];
      } else {
        const diff = node.values.length - newNode.values.length;
        return [node.setValues(newNode.values), diff];
      }
    }
  }

  replace(key: K, values: Iterable<V>): MultiMap<K, V> {
    const array = Array.from(values);
    const [node, diff] = this.replaceNode(
      new Node<K, V>(key, array),
      this.root
    );
    return this.setRoot(node).setCount(this.count + diff);
  }

  private updateRemoveNode(
    key: K,
    value: V,
    node: Node<K, V>
  ): Optional<Node<K, V>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(key, node.key);
    if (comparison == 0) {
      const values = [];
      let deleted = false;
      for (let _value of node.values) {
        if (!deleted && this.equals(value, _value)) {
          deleted = true;
        } else {
          values.push(_value);
        }
      }
      if (values.length == 0) {
        return Optional.ofValue(node.replaceWithSuccessor());
      } else if (values.length == node.values.length) {
        return Optional.empty();
      } else {
        return Optional.ofValue(node.setValues(values));
      }
    } else if (comparison > 0) {
      return this.updateRemoveNode(key, value, node.right).map(
        node.setRight.bind(node)
      );
    } else {
      return this.updateRemoveNode(key, value, node.left).map(
        node.setLeft.bind(node)
      );
    }
  }

  remove(key: K, value: V): MultiMap<K, V> {
    const tree = this;
    return this.updateRemoveNode(key, value, this.root)
      .map(replaced => tree.setRoot(replaced).setCount(tree.count - 1))
      .orValue(this);
  }

  private removeNode(key: K, node: Node<K, V>): Optional<Node<K, V>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(key, node.key);
    if (comparison == 0) {
      return Optional.ofValue(node.replaceWithSuccessor());
    } else if (comparison > 0) {
      return this.removeNode(key, node.right).map(node.setRight.bind(node));
    } else {
      return this.removeNode(key, node.left).map(node.setLeft.bind(node));
    }
  }

  removeAll(key: K): MultiMap<K, V> {
    const tree = this;
    return this.removeNode(key, this.root)
      .map(replaced => tree.setRoot(replaced).setCount(tree.count - 1))
      .orValue(this);
  }

  private searchKey(key: K, node: Node<K, V>): Optional<Node<K, V>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(key, node.key);
    if (comparison == 0) {
      return Optional.ofValue(node);
    } else if (comparison > 0) {
      return this.searchKey(key, node.right);
    } else {
      return this.searchKey(key, node.left);
    }
  }

  getAll(key: K): V[] {
    return this.searchKey(key, this.root)
      .map(node => node.values)
      .orValue([]);
  }

  containsKey(key: K): boolean {
    return this.searchKey(key, this.root).isPresent();
  }

  containsValue(value: V): boolean {
    for (let [_, _value] of this) {
      if (this.equals(value, _value)) {
        return true;
      }
    }
    return false;
  }

  containsEntry(key: K, value: V): boolean {
    return this.searchKey(key, this.root)
      .filter(
        function(node) {
          for (let _value of node.values) {
            if (this.equals(value, _value)) {
              return true;
            }
          }
          return false;
        }.bind(this)
      )
      .isPresent();
  }

  clear(): MultiMap<K, V> {
    return new BinarySearchTree<K, V>(this.comparator, this.equals);
  }

  isEmpty(): boolean {
    return this.root == null;
  }

  size(): number {
    return this.count;
  }

  keys(): K[] {
    const array = [];
    for (let [key, _] of this) {
      array.push(key);
    }
    return array;
  }

  values(): V[] {
    const array = [];
    for (let [_, value] of this) {
      array.push(value);
    }
    return array;
  }

  entries(): [K, V][] {
    return Array.from(this);
  }

  [Symbol.iterator](): Iterator<[K, V]> {
    function* visit(node: Node<K, V>) {
      if (node) {
        yield* visit(node.left);
        for (let value of node.values) {
          yield [node.key, value];
        }
        yield* visit(node.right);
      }
    }
    return visit(this.root);
  }

  iterator(key: K): ListIterator<[K, V]> {
    return new BinarySearchTreeListIterator<K, V>(this, key);
  }
}