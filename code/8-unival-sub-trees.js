/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}


const countUnivalSubtrees = function (root) {
  let counter = [0];

  if (root === null) return counter[0];
  rec(root, counter);

  return counter[0];
};

// recursive helper function 
const rec = (root, counter) => {
  // Return false to indicate NULL
  if (root === null) return true;

  // Recursively count in left and right subtrees also
  let left = rec(root.left, counter);
  let right = rec(root.right, counter);

  // If any of the subtrees is not singly, then this
  // cannot be singly.
  if (!left || !right) return false;

  // left subtree and right subtree are non-empty
  if (left && right) {
    // if parent's data does not match with the child's data
    if (root.left !== null && root.left.val !== root.val) return false;
    if (root.right !== null && root.right.val !== root.val) return false;
    counter[0] = counter[0] + 1;
    return true;
  }

  // default case
  return false;
};

// Driver program to test above functions

/* Let us construct the below tree
                5
              /   \
            4      5
          /  \      \
         4    4      5 
*/

const root = new TreeNode(5);
root.left = new TreeNode(4);
root.right = new TreeNode(5);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(4);
root.right.right = new TreeNode(5);

console.log(
  'The count of single valued sub trees is : ' + countUnivalSubtrees(root)
);
