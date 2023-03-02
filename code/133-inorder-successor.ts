/*
    Find inorder successor 
    Given a node in a binary search tree, return the next bigger element, also known as the inorder successor.

    For example, the inorder successor of 22 is 30.

      10
     /  \
    5    30
        /  \
      22    35
    You can assume each node has a parent pointer.
 */

// find inorder successor by using the parent pointer
(() => { 
    class BTree {
        val: number;
        left: BTree | null;
        right: BTree | null;
        parent: BTree | null;

        constructor(
            val: number,
            left: BTree | null = null,
            right: BTree | null = null,
            parent: BTree | null = null,
        ) {
            this.val = val;
            this.left = left;
            this.right = right;
            this.parent = parent;
        }
    }

    /* Test case
         10
        /  \
       5    30
            /  \
          22    35
            \
            25
    */
    (() => { 
        let treeRoot = new BTree(10);
        treeRoot = insert(treeRoot, 5);
        treeRoot = insert(treeRoot, 30);
        treeRoot = insert(treeRoot, 22);
        treeRoot = insert(treeRoot, 35);
        treeRoot = insert(treeRoot, 25);

        console.log('tree', treeRoot);

        console.log(findInOrderSuccessor(treeRoot)!.val);  // 10's inorder successor is 22
        console.log(findInOrderSuccessor(treeRoot!.left)!.val);  // 5's inorder successor is 10
        console.log(findInOrderSuccessor(treeRoot!.right!.left!.right)!.val);  // 25's inorder successor is 30

    })();
    
    function findInOrderSuccessor(node: BTree | null) {
        // If right subtree of node is not NULL, then succ lies in right subtree:
        // Go to right subtree and return the node with minimum key value in the right subtree.
        if (node?.right) {
            return findLeftmost(node.right);
        }

        // If right subtree of node is NULL, then succ is one of the ancestors:
        // Travel up using the parent pointer until you see **a node which is left child of its parent**. 
        // The parent of such a node is the succ.
        let parent = node?.parent;

        // while (parent && parent.left !== node) {
        while (parent && parent.right === node) {
            parent = parent.parent;
            node = parent;
        }

        return parent;

        function findLeftmost(node: BTree | null) { 
            let current = node;

            while (current?.left) {
                current = current.left;
            }
            return current;
        }
    }

    function insert(root: BTree | null, data: number) {
        if (root === null) { 
            return new BTree(data);
        } else {
            // recur down the tree
            let temp = null;

            if (data <= root.val) {
                temp = insert(root.left, data);
                root.left = temp;
                temp.parent = root;
            } else {
                temp = insert(root.right, data);
                root.right = temp;
                temp.parent = root;
            }

            // return the unchanged root pointer
            return root;
        }
    }


})();