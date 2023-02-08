/*
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. 
Assume that each node in the tree also has a pointer to its parent.
 */

(() => { 
    class Tree {
        data: string | number;
        left: Tree | null;
        right: Tree | null;

        constructor(data: string | number) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }

    const lowestCommonAncestor = (
        root: Tree | null,
        node1: Tree,
        node2: Tree,
    ): Tree | null => { 
        if (!root) return null;

        if (root === node1 || root === node2) return root;

        const left = lowestCommonAncestor(root.left, node1, node2);
        const right = lowestCommonAncestor(root.right, node1, node2);

        // If both nodes are found in separate subtrees of the current node, then the current node is the LCA
        if (left && right) return root;

        // If only one of the nodes is found in the subtrees, the LCA is in that subtree. 
        return left ? left : right;
    };

    (() => {
        let root;
        const nodeA = root = new Tree('A');
        const nodeB = nodeA.left = new Tree('B');
        const nodeC = nodeA.right = new Tree('C');
        const nodeD = nodeB.left = new Tree('D');
        const nodeE = nodeB.right = new Tree('E');
        const nodeF = nodeC.left = new Tree('F');
        const nodeG = nodeC.right = new Tree('G');
        const nodeH = nodeD.left = new Tree('H');
        const nodeI = nodeE.right = new Tree('I');
        const nodeJ = nodeG.left = new Tree('J');
        const nodeK = nodeI.left = new Tree('K');
        const nodeL = nodeI.right = new Tree('L');
        /* 
                           A
                    /           \
                    B              C
                /      \        /      \
               D       E        F       G  
              /         \              /
              H          I            J
                      /     \
                    K         L
         */

        console.log(lowestCommonAncestor(root, nodeH, nodeL)!.data);  // nodeB
        console.log(lowestCommonAncestor(root, nodeF, nodeJ)!.data);  // nodeC
    })();
})();

/*
rationale:
In this implementation, the function lowestCommonAncestor takes the root of the binary tree, 
and two nodes as input, and returns the lowest common ancestor of the two nodes. 
The function uses a recursive DFS approach to traverse the tree and track the presence of the two nodes. 

If both nodes are found in separate subtrees of the current node, then the current node is the LCA. 
If only one of the nodes is found in the subtrees, the LCA is in that subtree. 
The time complexity of this approach is O(n) where n is the number of nodes in the tree.
 */