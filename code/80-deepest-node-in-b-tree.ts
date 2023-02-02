/*
Given the root of a binary tree, return a deepest node. For example, in the following tree, return d.

    a
   / \
  b   c
 /
d
 */

class BTree {
    data: any;
    left: BTree | null;
    right: BTree | null;

    constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

/**
 * Find the deepest node using breadth-first search
 * @param root 
 * @returns the deepest node after the breadth-first search is completed
 */
const findDeepestNode = (root: BTree): BTree | null | undefined => { 
    // if root is null or undefined then return null
    if (!root) return null;

    // for bfs - after bfs search is completed the node is automatically the deepest node
    let current = null;

    // create a queue
    const q: BTree[] = [];
    q.push(root);

    // as the tree branches out, there is no need to track visited nodes

    // iterate until q is empty
    while (q.length > 0) { 
        current = q.shift();
        if (current?.left) {
            q.push(current.left);
        }
        if (current?.right) {
            q.push(current.right);
        }
    }

    return current;
};

// Complexity Analysis:
    // Time: O(V + E), where V is the number of vertices / nodes and E is the number of edges
    // Aux. Space: O(V)

// driver code 
(() => { 
    const root = new BTree(1);
    root.left = new BTree(2);
    root.right = new BTree(3);
    root.left.left = new BTree(4);
    root.right.left = new BTree(5);
    root.right.right = new BTree(6);
    root.right.left.right = new BTree(7);
    root.right.right.right = new BTree(8);
    root.right.left.right.left = new BTree(9);

    console.log('root', root);
    console.log(findDeepestNode(root)?.data);

    const anotherRoot = new BTree(1);
    anotherRoot.left = new BTree(2);
    anotherRoot.right = new BTree(3);
    anotherRoot.left.left = new BTree(4);
    anotherRoot.left.right = new BTree(5);
    anotherRoot.right.left = new BTree(6);
    anotherRoot.right.right = new BTree(7);
    anotherRoot.right.right.right = new BTree(8);

    console.log('another root', anotherRoot);
    console.log(findDeepestNode(anotherRoot)?.data);

    const yetAnotherRoot = new BTree(1);
    yetAnotherRoot.left = new BTree(2);
    yetAnotherRoot.right = new BTree(3);
    yetAnotherRoot.right.left = new BTree(6);

    console.log('yet another root', yetAnotherRoot);
    console.log(findDeepestNode(yetAnotherRoot)?.data);
})();
