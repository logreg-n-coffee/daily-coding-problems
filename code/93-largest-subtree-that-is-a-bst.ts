/*
Given a tree, find the largest tree/subtree that is a BST.

Given a tree, return the size of the largest tree/subtree that is a BST.
 */

(() => { 
    class Node {
        val: number;
        left: Node | null;
        right: Node | null;

        constructor(
            val = 0,
            left: Node | null = null,
            right: Node | null = null
        ) { 
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    const findLargestBST = (root: Node | null): number => { 
        let maxSize = 0;

        findSize(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

        return maxSize;

        function isBST(
            node: Node | null, lower: number, upper: number
        ): boolean {
            if (!node)
                return true;
            if (node.val <= lower || node.val >= upper)
                return false;
            return (
                isBST(node.left, lower, node.val) &&
                isBST(node.right, node.val, upper)
            );
        }

        function findSize(
            node: Node | null, lower: number, upper: number
        ): number { 
            if (!node) return 0;
            if (isBST(node, lower, upper)) {
                const currentSize =
                    1 + findSize(node.left, lower, node.val) + findSize(node.right, node.val, upper)
                maxSize = Math.max(maxSize, currentSize);
                return Math.max(maxSize, currentSize);
            } else {
                return Math.max(
                    findSize(node.left, lower, upper),
                    findSize(node.right, lower, upper)
                );
            }
        }
    };

    (() => { 
        const root = new Node(10);
        root.left = new Node(5);
        root.right = new Node(15);
        root.left.left = new Node(1);
        root.left.right = new Node(8);
        root.right.right = new Node(7);

        // (BST is the subtree rooted at 5)
        console.log(findLargestBST(root));  // expects value to be 3
    })();
})();

/* Intuition: Question 89 - isValid BST

One way to find the largest BST in a tree is to use a modified version of in-order traversal, 
where during the traversal, you keep track of the lower and upper bounds of the current subtree and 
check if it is a valid BST. 

If it is, update the size of the largest BST if the current subtree is larger. 
Repeat this process for each subtree in the tree.

To return the size of the largest BST, you can use a global variable 
to store the size and update it during the traversal as described above. 
Once the traversal is complete, return the value of the global variable.

 */