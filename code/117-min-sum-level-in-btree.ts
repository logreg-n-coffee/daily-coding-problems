/*
 Given a binary tree, return the level of the tree with minimum sum.
 */

(() => {
    class Tree {
        val: number;
        left: Tree | null;
        right: Tree | null;

        constructor(val: number, left: Tree | null = null, right: Tree | null = null) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    // solve the level of the tree with minimum sum with bfs (level)
    const minLevelSum = (root: Tree | null) => { 
        if (!root) return 0;

        const q: [[Tree, number]] = [[root, 0]];  // [treeNode, level]
        const levelSum: {[level: number]: number} = {};
            
        while (q.length > 0) { 
            const [node, level] = q.shift()!;

            if (levelSum.hasOwnProperty(level)) {
                levelSum[level] += node.val;
            } else {
                levelSum[level] = node.val;
            }
            
            if (node.left) {
                q.push([node.left, level + 1]);
            }
            if (node.right) { 
                q.push([node.right, level + 1]);
            }
        }

        // returns the element with the smallest value - property name is always dynamic (number / string)
        return Object.entries(levelSum).reduce((a, b) => a[1] < b[1] ? a : b)[0];
    };

    (() => { 
        /* 
                           A 3
                    /           \
                    B 2              C 7
                /      \        /      \
               D 1       E 2       F 4      G 3 
              /         \              /
              H 2         I 1           J 3
                      /     \
                    K 5        L 6
         */

        let tree;
        const nodeA = tree = new Tree(3);
        const nodeB = nodeA.left = new Tree(2);
        const nodeC = nodeA.right = new Tree(7);
        const nodeD = nodeB.left = new Tree(1);
        const nodeE = nodeB.right = new Tree(2);
        const nodeF = nodeC.left = new Tree(4);
        const nodeG = nodeC.right = new Tree(3);
        const nodeH = nodeD.left = new Tree(2);
        const nodeI = nodeE.right = new Tree(1);
        const nodeJ = nodeG.left = new Tree(3);
        const nodeK = nodeI.left = new Tree(5);
        const nodeL = nodeI.right = new Tree(6);

        // { '0': 3, '1': 9, '2': 10, '3': 6, '4': 11 }
        console.log(minLevelSum(tree));  // the level with min sum is level 0 
    })();
})();