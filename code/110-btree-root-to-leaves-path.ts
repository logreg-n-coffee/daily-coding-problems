/*
Given a binary tree, return all paths from the root to leaves.

For example, given the tree:

   1
  / \
 2   3
    / \
   4   5
Return [[1, 2], [1, 3, 4], [1, 3, 5]].
 */

(() => { 
    class BTree {
        val: number;
        left: BTree | null;
        right: BTree | null;
        
        constructor(val: number) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    const pathsFromRootToLeaves = (root: BTree): number[][] => { 
        // if root does not exist, return empty array
        if (!root) return [];

        const res: number[][] = [];
        dfs(root, []);
        return res;

        function dfs(node: BTree, path: number[]): void { 
            // if there is no more path, save the current val and push the path to res
            if (!node.left && !node.right) {
                res.push(path.concat(node.val));  // or res.push([...path, node.val])
                return;
            }

            // explore the left child and save the current path
            if (node.left) {
                dfs(node.left, path.concat(node.val));
            }

            // explore the right child and save the current path
            if (node.right) { 
                dfs(node.right, path.concat(node.val));
            }
        }
    };


    (() => { 
        const tree = new BTree(1);
        tree.left = new BTree(2);
        tree.right = new BTree(3);
        tree.right.left = new BTree(4);
        tree.right.right = new BTree(5);

        console.log(pathsFromRootToLeaves(tree));
    })();
})();