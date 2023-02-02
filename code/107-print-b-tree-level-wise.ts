/*
Print the nodes in a binary tree level-wise. For example, the following should print 1, 2, 3, 4, 5.

  1
 / \
2   3
   / \
  4   5
 */

(() => { 
    class BTree {
        val: number | null;
        left: BTree | null;
        right: BTree | null;
        constructor(val: number | null) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    /**
     * print the tree by level using breath first search (will finish the same level before digging deeper)
     * @param root 
     * @returns void
     */
    const printTreeByLevel = (root: BTree): void => { 
        if (!root) return;

        // create a queue for bfs traversal
        const q = [];

        // enqueue the root node
        q.push(root);

        // as the tree branches out, there is no need to track visited nodes

        // while the queue is not empty
        while (q.length > 0) {
            // dequeue the current node and log the current value
            const current = q.shift();
            console.log(current!.val);

            // check the left subtree and right subtree
            if (current?.left) {
                q.push(current.left);
            }
            if (current?.right) {
                q.push(current.right);
            }
        }
    };

    // Complexity Analysis:
    // Time: O(V + E), where V is the number of vertices / nodes and E is the number of edges
    // Aux. Space: O(V)

    (() => { 
        const root = new BTree(1);
        root.left = new BTree(2);
        root.right = new BTree(3);
        root.right.left = new BTree(4);
        root.right.right = new BTree(5);

        printTreeByLevel(root);
    })();
})();