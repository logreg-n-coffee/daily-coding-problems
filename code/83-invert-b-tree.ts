/*
Invert a binary tree.

For example, given the following tree:

    a
   / \
  b   c
 / \  /
d   e f
should become:

  a
 / \
 c  b
 \  / \
  f e  d
 */

class BTreeNode {
    data: any;
    left: BTreeNode | null;
    right: BTreeNode | null;

    constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    inorderPrint(node: BTreeNode | null = this) {
        if (node === null) {
            return;
        }

        // first recur on the left child
        this.inorderPrint(node.left);

        // print the data of the node
        console.log(node.data);

        // recur on the right child
        this.inorderPrint(node.right);
    }
}

const invert = (node: BTreeNode | null | undefined) => { 
    if (!node) {
        return node;
    }

    const left: any = invert(node.left);
    const right: any = invert(node.right);

    node.left = right;
    node.right = left;

    return node;
};

(() => { 
    const root = new BTreeNode(1);
    root.left = new BTreeNode(2);
    root.right = new BTreeNode(3);
    root.left.left = new BTreeNode(4);
    root.right.left = new BTreeNode(5);
    root.right.right = new BTreeNode(6);
    root.right.left.right = new BTreeNode(7);
    root.right.right.right = new BTreeNode(8);
    root.right.left.right.left = new BTreeNode(9);

    root.inorderPrint();

    console.log('\n');

    invert(root)?.inorderPrint();
})();
