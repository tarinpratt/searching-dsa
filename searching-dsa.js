function binarySearch(array, value, start, end, count) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        console.log('not found in ' + count + ' tries')
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end, count++);
    if (item == value) {
        console.log('found ' + value + ' in ' + count + ' attempts' )
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end, count);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1, count);
    }
};
const arr = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18]
const dataSet = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]
const data = dataSet.sort()
console.log(binarySearch(arr, 8, 0, arr.length, 0))
console.log(binarySearch(arr, 16, 0, arr.length, 0))
console.log(binarySearch(data, 51, 0, data.length, 0))

//14 15 19 25 27 35 79 89 90 91
//35 25 15 14 19 27 89 79 91 90

console.log("WHAT THE FUCk")
class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        // Similarly, if the new key is greater than the node's key 
           //then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}
function main() {
    const BST = new BinarySearchTree();
    BST.insert(25, 25)
    BST.insert(15, 15)
    BST.insert(50, 50)
    BST.insert(10, 10)
    BST.insert(24, 24)
    BST.insert(35, 35)
    BST.insert(70, 70)
    BST.insert(4, 4)
    BST.insert(12, 12)
    BST.insert(18, 18)
    BST.insert(31, 31)
    BST.insert(44, 44)
    BST.insert(66, 66)
    BST.insert(90, 90)
    BST.insert(22, 22)
    console.log(BST)
    const preOrder = tree => {
        // console.log({ preOrder: tree.key });
        if (tree.left) {
          preOrder(tree.left);
        }
        if (tree.right) {
          preOrder(tree.right);
        }
      };
      
      const inOrder = tree => {
        if (tree.left) {
          inOrder(tree.left);
        }
        // console.log({ inOrder: tree.key });
        if (tree.right) {
          inOrder(tree.right);
        }
      };
    
      const postOrder = tree => {
        if (tree.left) {
          postOrder(tree.left);
        }
        if (tree.right) {
          postOrder(tree.right);
        }
        // console.log({ postOrder: tree.key });
      };
    
      preOrder(BST);
      inOrder(BST);
      postOrder(BST);
    }
    main();

    class _Node {
        constructor(value) {
          this.value = value;
          this.next = null;
          this.prev = null;
        }
      }
      
      class Queue {
        constructor() {
          this.first = null;
          this.last = null;
        }
      
        enqueue(data) {
          const node = new _Node(data);
      
          if (this.first === null) {
            this.first = node;
          }
      
          if (this.last) {
            this.last.next = node;
            this.last.prev = node;
          }
      
          this.last = node;
        }
      
        dequeue() {
          if (this.first === null) {
            return;
          }
      
          const node = this.first;
          this.first = node.prev;
      
          if (node === this.last) {
            this.last = null;
          }
          return node.value;
        }
      }

function cmdOfficer(tree, result = []) {
  const queue = new Queue();
  queue.enqueue(tree);

  while (queue.first !== null) {
    const node = queue.dequeue();
    result.push(node.value);

    if (node.left) {
      queue.enqueue(node.left);
    }

    if (node.right) {
      queue.enqueue(node.right);
    }
  }
  // result.forEach(officers => console.log(officers));
}

function nextOfficer() {
  let BST = new BinarySearchTree();
  BST.insert(5, 'Captain Picard');
  BST.insert(3, 'Commander Riker');
  BST.insert(6, 'Commander Data');
  BST.insert(8, 'Lt. Cmdr. Crusher');
  BST.insert(7, 'Lieutenant Selar');
  BST.insert(2, 'Lt. Cmdr. Worf');
  BST.insert(4, 'Lt. Cmdr. LaForge');
  BST.insert(1, 'Lt. security-officer');

  cmdOfficer(BST);
}
console.log(nextOfficer());

function maxProfit(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i + 1] - arr[i] > max) {
        max = arr[i + 1] - arr[i];
      }
    }
    console.log(max);
    return max;
  }
  // gets 24 for next day
  console.log(maxProfit([128, 97, 121, 123, 98, 97, 105])); 