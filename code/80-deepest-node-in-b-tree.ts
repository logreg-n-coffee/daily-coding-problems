/*
Given the root of a binary tree, return a deepest node. For example, in the following tree, return d.

    a
   / \
  b   c
 /
d
 */

class BTree {
    root: any;
    left: BTree | null;
    right: BTree | null;

    constructor(root: any) {
        this.root = root;
        this.left = null;
        this.right = null;
    }
}

const findDeepestNode = (root: BTree): BTree | null | undefined => { 
    let current = null;

    if (!root) return null;

    // create a queue
    const q: BTree[] = [];
    q.push(root);

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
    console.log(findDeepestNode(root));

    const anotherRoot = new BTree(1);
    anotherRoot.left = new BTree(2);
    anotherRoot.right = new BTree(3);
    anotherRoot.left.left = new BTree(4);
    anotherRoot.left.right = new BTree(5);
    anotherRoot.right.left = new BTree(6);
    anotherRoot.right.right = new BTree(7);
    anotherRoot.right.right.right = new BTree(8);

    console.log('another root', anotherRoot);
    console.log(findDeepestNode(anotherRoot));

    const yetAnotherRoot = new BTree(1);
    yetAnotherRoot.left = new BTree(2);
    yetAnotherRoot.right = new BTree(3);
    yetAnotherRoot.right.left = new BTree(6);

    console.log('yet another root', yetAnotherRoot);
    console.log(findDeepestNode(yetAnotherRoot));
})();
