/*
Suppose an arithmetic expression is given as a binary tree. 
Each leaf is an integer and each internal node is one of '+', '−', '∗', or '/'.

Given the root to such a tree, write a function to evaluate it.

For example, given the following tree:

    *
   / \
  +    +
 / \  / \
3  2  4  5
You should return 45, as it is (3 + 2) * (4 + 5).
*/

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/**
 * a function to evaluate a tree, where an arithmetic expression is given as a binary tree. 
 * @param {Node} root 
 * @returns {number|string} the evaluated value of the tree or a string 'unable to evaluate'
 */
const evalTree = (root) => {
    // empty tree
    if (root === null) return 0;

    // leaf node - parse that to integer -> noticeable property: leaves (int) don't have children
    if (root.left === null && root.right === null) {
        return parseInt(root.val);
    }

    // eval left subtree
    const leftEval = evalTree(root.left);
    const rightEval = evalTree(root.right);

    // check the operators and return the result accordingly
    if (root.val === '+') {
        return leftEval + rightEval;
    } else if (root.val === '-') {
        return leftEval - rightEval;
    } else if (root.val === '*') {
        return leftEval * rightEval;
    } else if (root.val === '/') {
        return leftEval / rightEval;
    }

    // default return
    return 'unable to evaluate the tree';
};

// Driver code
const myTree = new Node('*');

myTree.left = new Node('+');
myTree.right = new Node('+');

myTree.left.left = new Node('3');
myTree.left.right = new Node('2');

myTree.right.left = new Node('4');
myTree.right.right = new Node('5');

console.log(evalTree(myTree));

// TC & Extra SC: O(N) - as it has to go through every node
