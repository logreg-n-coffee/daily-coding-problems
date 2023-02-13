/*
Generate a finite, but an arbitrarily large binary tree quickly in O(1).

That is, generate() should return a tree whose size is unbounded but finite.
 */

/*
Solution:
Unfortunately, it is not possible to generate an arbitrarily large binary tree in O(1) time. 
The size of a tree grows exponentially with the number of levels, so generating a tree of an arbitrarily 
large size would require an exponential amount of time and memory.

If you have a specific maximum size for the tree that you would like to generate, 
you could generate a tree of that size using a recursive algorithm that adds nodes to the tree in a breadth-first manner, 
starting from the root. 
However, the time complexity of this algorithm would still be proportional to the size of the tree, so it would not be O(1).
 */

// ---------------------------------------------------------------- //

(() => { 
    class Tree {
        value: number;
        left: Tree | null;
        right: Tree | null;

        constructor(value: number) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    /**
     * Start with a root node. For each node in the tree, create two child nodes, until the number of nodes in the tree is equal to "n".
     * @param n 
     * @returns Tree | null
     */
    function generate(n: number): Tree | null { 
        if (n <= 0) return null;

        const root = new Tree(1);
        const q = [root];

        for (let i = 2; i <= n; i++) { 
            const parent = q.shift();
            if (!parent) break;

            const left = new Tree(i);
            const right = new Tree(i + 1);

            parent.left = left;
            parent.right = right;

            q.push(left);
            q.push(right);
        }

        return root;
    }

    function printTree(tree: Tree | null, depth = 0): void { 
        if (!tree) return;

        printTree(tree.right, depth + 1);
        console.log(' '.repeat(depth * 2) + tree.value);
        printTree(tree.left, depth + 1);
    }

    printTree(generate(4));
    console.log('\n');
    printTree(generate(5));
})();