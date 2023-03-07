/*
    Given a binary tree, find a minimum path sum from *root to a leaf*. ** Different from 94

    For example, the minimum path in this tree is [10, 5, 1, -1], which has sum 15.

  10
 /  \
5    5
 \     \
   2    1
       /
     -1
 */

(() => { 
    class TreeNode {
        val: number;
        left: TreeNode | null;
        right: TreeNode | null;

        constructor(val: number) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    /* Solve with DFS and keep track of the minimum path sum found so far */
    function minPathSum(root: TreeNode | null): number {
        if (!root) return 0;

        if (!root.left && !root.right) return root.val;

        if (!root.left) {
            return root.val + minPathSum(root.right);
        }

        if (!root.right) {
            return root.val + minPathSum(root.left);
        }

        return root.val + Math.min(minPathSum(root.left), minPathSum(root.right));
    }

    // test case
    const tree = new TreeNode(10);
    tree.left = new TreeNode(5);
    tree.right = new TreeNode(5);
    tree.left.right = new TreeNode(2);
    tree.right.right = new TreeNode(1);
    tree.right.right.left = new TreeNode(-1);

    console.log(minPathSum(tree));
})();