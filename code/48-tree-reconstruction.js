/*
Given pre-order and in-order traversals of a binary tree, write a function to reconstruct the tree.

For example, given the following preorder traversal:

[a, b, d, e, c, f, g]

And the following inorder traversal:

[d, b, e, a, f, c, g]

You should return the following tree:

    a
   / \
  b   c
 / \ / \
d  e f  g
*/

/*
Intuition: usually, one type of traversal is not enough to reconstruct a tree, 
and we must use two traversals in combination.
    1. In-order and pre-order
    2. In-order and post-order
    3. Pre-order and post-order – can be used only if the tree is a full binary tree.

*/

class Node {
    constructor(val = null) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const reconstructTree = (preorder, inorder) => {
    // preorderIndex as a global variable
    let preorderIndex = 0;

    // execute the function
    const tree = buildTree(preorder, inorder);

    return tree;
    
    function buildTree(preorder, inorder) {
        const node = new Node(preorder[preorderIndex++]);
        const inorderIndex = inorder.indexOf(node.val);

        const inorderLeftNodes = [];
        const inorderRightNodes = [];

        // get a list of inorder left nodes
        for (let i = 0; i < inorderIndex - 1; i++) {
            inorderLeftNodes.push(new Node(inorder[i]));
        }

        // get a list of inorder right nodes
        for (let i = inorderIndex + 1; i < inorder.length - 1; i++) {
            inorderRightNodes.push(new Node(inorder[i]));
        }

        if (inorderRightNodes.length === 0 && inorderLeftNodes.length === 0) {
            return node;
        }

        node.left = buildTree(preorder, inorderLeftNodes);
        node.right = buildTree(preorder, inorderRightNodes);

        return node;
    }
};

// driver code 
const myTree = reconstructTree(
    ['a', 'b', 'd', 'e', 'c', 'f', 'g'],
    ['d', 'b', 'e', 'a', 'f', 'c', 'g']
);

console.log(myTree);
