/**
 * Given the root to a binary search tree, find the second largest node in the tree.
 */

// features of BST: 
// 1. left node of a parent node is smaller than its parent node (root)
// 2. right node of a parent node is larger than its parent node (root)
class BST {
    constructor(value, depth = 1) {
        this.value = value;
        this.depth = depth;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        // insert the value based on the feature of the BST
        // left node
        if (value < this.value) {
            if (!this.left) {
                this.left = new BST(value, this.depth + 1);
            } else {
                this.left.insert(value);
            }
        } else {
            // right node
            if (!this.right) {
                this.right = new BST(value, this.depth + 1);
            } else {
                this.right.insert(value);
            }
        }
    }
}

/* Intuition: 
Naive solution: In-order dfs traversal and then store the values in an array, return the second-to-last element in the array - O(n) time and space
Improved solution: reverse in-order dfs traversal: keep a counter, and once we start processing the current node we can increment the counter. 
Once it hits 2, that means the current node we're looking at is the second largest, so we can stuff it in a variable and eventually return that. 
*/

const secondLargest = (root) => {
    let count = 0;
    let val = null;

    function reversedDFS(node) {
        if (!node || count === 2) {
            return;
        }

        if (node.right) {
            reversedDFS(node.right);
        }

        count++;
        if (count === 2) {
            val = node.value;
        }

        if (node.left) {
            reversedDFS(node.left);
        }
    }

    reversedDFS(root);
    
    return val;
};

// Driver code:
const randomNum = () => Math.floor(Math.random() * 40);
const bt = new BST(20);
const nums = [];

for (let i = 0; i < 10; i++) {
    nums.push(randomNum());
    bt.insert(nums[i]);
}

console.log(nums);

console.log('The second largest element in the BST is: ', secondLargest(bt));
