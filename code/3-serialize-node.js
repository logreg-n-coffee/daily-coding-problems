class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * encode a tree into a string - preorder traversal
 * @param {Node} root
 * @return {string} a serialized string representation of the tree
 */

function serialize(root) {
    let res = '';
    function dfs(root) {
        if (!root) {
            res += 'null,';
            return;
        }
        res += root.val + ',';
        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);
    return res;
}

/**
 * decode a string into a tree - preorder traversal
 * @param {string} a serialized string representation of the tree
 * @return {Node} root
 */
function deserialize(string) {
    let dataArray = string.split(',');
    dataArray.pop();
    // console.log(dataArray);

    function recursiveDeserialize(arr) {
        // arr.length > 0 prevents infinite recursion 
        if (arr.length > 0) {
            if (arr[0] === 'null') {
                arr.shift();
                return null;
            }

            const root = new Node(arr[0]);
            arr.shift();
            // const root = new Node(array.shift());

            root.left = recursiveDeserialize(arr);
            root.right = recursiveDeserialize(arr);
            return root;
        }
    }

    const root = recursiveDeserialize(dataArray);
    return root;
}

const node = new Node(
    '1',
    new Node('2', new Node('4', new Node('6'), new Node('7')), new Node('5')),
    new Node('3')
);
console.log(node);

const serializedString = serialize(node);
console.log('serializedString: ', serializedString);

const deserializeNode = deserialize(serializedString);
console.log('deserializeNode: ', deserializeNode);

// Time Complexity: O(n) - Space Complexity: O(n)