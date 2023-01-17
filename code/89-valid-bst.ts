/*
Determine whether a tree is a valid binary search tree.

A binary search tree is a tree with two children, left and right, and satisfies the constraint that 
the key in the left child must be less than or equal to the root and 
the key in the right child must be greater than or equal to the root.
 */

(() => { 
    class Node {
        value: number;
        left: Node | null;
        right: Node | null;

        constructor(value: number) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    const isValidBST = (root: Node) => { 
        return dfs(root, -Infinity, Infinity);

        function dfs(
            root: Node | null,
            minVal: number,
            maxVal: number
        ): boolean {
            if (root === null) {
                return true;
            }
            if (root.value <= minVal && root.value >= maxVal) { 
                return false;
            }
            return (
                dfs(root.left, minVal, root.value) &&
                dfs(root.right, root.value, maxVal)
            );
        }
    };

    (() => { 
        const root = new Node(8);
        root.left = new Node(3);
        root.left.left = new Node(1);
        root.left.right = new Node(6);
        root.left.right.left = new Node(4);
        root.left.right.right = new Node(7);
        root.right = new Node(10);
        root.right.right = new Node(14);
        root.right.right.left = new Node(13);

        console.log(isValidBST(root));
    })();
})();

// TC: O(n) where n is the number of nodes in the tree (we have to go through every node in the tree)
