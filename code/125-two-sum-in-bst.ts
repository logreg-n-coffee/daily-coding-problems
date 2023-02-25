/*
    Given the root of a binary search tree, and a target K, return two nodes in the tree whose sum equals K.

    For example, given the following tree and K of 20

        10
       /   \
      5     15
           /  \
         11    15
    Return the nodes 5 and 15.
 */

(() => {
    class TreeNode {
        val: number;
        left: TreeNode | null;
        right: TreeNode | null;

        constructor(
            val: number = 0,
            left: TreeNode | null = null,
            right: TreeNode | null = null,
        ) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }
    
    /**
     * find two nodes in the tree whose sum equals K - complexity O(n) time and space - n is the number of nodes in the tree
     * @param root root of a binary search tree
     * @param k target
     * @returns [number, number] | null
     */
    function findTarget(root: TreeNode | null, k: number): [number, number] | null {
        // Initialize a hash set to store values seen so far
        const seen: Set<number> = new Set<number>();
        // Initialize a stack to simulate in-order traversal of the binary search tree
        const stack = [];
        let node: TreeNode | null = root;

        // Travser the tree - Loop until the stack is empty and there are no more nodes to visit
        while (stack.length > 0 || node) {
            // Traverse left subtree and push all nodes onto the stack
            while (node) {
                stack.push(node);
                node = node.left;
            }

            node = stack.pop()!;

            // at each node, check if the difference between K and the current node value is already in the hash set
            if (seen.has(k - node.val)) {
                return [k - node.val, node.val];
            }

            // Add the current node value to the hash set and continue traversal
            seen.add(node.val);
            node = node.right;
        }

        // Return null if no pair of nodes adds up to k
        return null;
    }

    const tree = new TreeNode(10);
    tree.left = new TreeNode(5);
    tree.right = new TreeNode(15);
    tree.right.left = new TreeNode(11);
    tree.left.right = new TreeNode(15);

    console.log(findTarget(tree, 20));

})();