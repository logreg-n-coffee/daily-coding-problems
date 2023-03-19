/*
Given a binary tree where all nodes are either 0 or 1, 
prune the tree so that subtrees containing all 0s are removed.

For example, given the following tree:

   0
  / \
 1   0
    / \
   1   0
  / \
 0   0
should be pruned to:

   0
  / \
 1   0
    /
   1
We do not remove the tree at the root or its left child 
because it still has a 1 as a descendant.
 */

(() => {
    class Tree {
        val: number;
        left: Tree | null;
        right: Tree | null;

        constructor(val: number) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    // prune a tree using dfs traversal 
    const prune = (root: Tree | null) => { 
        if (!root) return root;

        [root.left, root.right] = [prune(root.left), prune(root.right)];

        if (!root.left && !root.right && root.val === 0) return null;

        return root;
    };

    const tree = new Tree(0);
    tree.left = new Tree(1);
    tree.right = new Tree(0);
    tree.right.left = new Tree(1);
    tree.right.right = new Tree(0);
    tree.right.left = new Tree(1);
    tree.right.left.left = new Tree(0);
    tree.right.left.right = new Tree(0);

    console.log(prune(tree));
})();