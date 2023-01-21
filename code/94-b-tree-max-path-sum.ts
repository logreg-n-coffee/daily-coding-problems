/*
Given a binary tree of integers, find the maximum path sum between two nodes. 
The path must go through at least one node, and does not need to go through the root.
 */

(() => {
    class TreeNode {
        val: number;
        left: TreeNode | null;
        right: TreeNode | null;
        
        constructor(
            val?: number,
            left?: TreeNode | null,
            right?: TreeNode | null,
        ) {
            this.val = (val === undefined ? 0 : val);
            this.left = (left === undefined ? null : left);
            this.right = (right === undefined ? null : right);
        }
    }

    (() => { 
        // test case
        const testOne = new TreeNode(1);
        testOne.left = new TreeNode(2);
        testOne.right = new TreeNode(3);
        console.log(maxPathSum(testOne));
        // The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

        const testTwo = new TreeNode(-10);
        testTwo.left = new TreeNode(9);
        testTwo.right = new TreeNode(20);
        testTwo.right.left = new TreeNode(15);
        testTwo.right.right = new TreeNode(7);
        console.log(maxPathSum(testTwo));
        // The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
    })();

    function maxPathSum(root: TreeNode | null): number {
        let maxPath = Number.MIN_SAFE_INTEGER;

        gainFromSubtree(root);

        return maxPath;

        // post order traversal of subtree rooted at 'node'
        function gainFromSubtree(node: TreeNode | null): number {
            if (!node) return 0;

            // add the path sum from left subtree and the current root
            const gainFromLeft = Math.max(gainFromSubtree(node.left), 0);

            // add the path sum from right subtree to the current root
            const gainFromRight = Math.max(gainFromSubtree(node.right), 0);

            // if left or right path sum are negative, they are counted as 0
            maxPath = Math.max(maxPath, gainFromLeft + gainFromRight + node.val);

            // return the max sum for a path starting at the rootof the subtree
            return Math.max(
                gainFromLeft + node.val,
                gainFromRight + node.val,
            );
        }
    }


})();

/*
PATH:
A path is a continuous sequence of nodes connected to each other. 

There will always be at least one node in a path. 

In a path, except for the starting and ending nodes, every node is connected to two other nodes in the sequence. 
These two nodes could either be the node's children, or one of them could be a child, 
and the other could be the parent node. 

In other words, no node can have more than two connections in this sequence. 
Each node contains a value, which could be negative, zero, or positive.

PATH SUM: 
We must traverse the entire tree to find the maximum path sum. 
We are interested in a set of nodes that form a continuous sequence (path). 
When traversing trees, we prefer DFS over BFS because it can examine each path before moving on to the next.


 */