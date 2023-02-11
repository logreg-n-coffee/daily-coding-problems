/*

Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. 
A subtree of s is a tree consists of a node in s and all of this node's descendants. 
The tree s could also be considered as a subtree of itself.

To determine if tree t is a subtree of tree s
 */

(() => { 
    class Tree {
        val: string | number;
        left: Tree | null;
        right: Tree | null;

        constructor(val: string | number) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    const isSubtree = (s: Tree | null, t: Tree): boolean => { 
        if (!s) return false;

        if (isSameTree(s, t)) return true;

        return isSubtree(s.left, t) || isSubtree(s.right, t);

        function isSameTree(p: Tree | null, q: Tree | null): boolean { 
            if (!p && !q) return true;
            if (!p || !q) return false;
            if (p.val !== q.val) return false;
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        }
    };

    (() => { 
        let tree;
        const nodeA = tree = new Tree('A');
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

        let subtree;
        const nodeAnotherI = subtree = new Tree('I');
        const nodeAnotherK = subtree.left = new Tree('K');
        const nodeAnotherL = subtree.right = new Tree('L');

        let notASubtree;
        const nodeAnotherA = notASubtree = new Tree('A');
        const nodeAnotherD = notASubtree.left = new Tree('D');
        const nodeAnotherE = notASubtree.right = new Tree('E');
        
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

        console.log(isSubtree(tree, subtree));
        console.log(isSubtree(tree, notASubtree));
    })();
})();