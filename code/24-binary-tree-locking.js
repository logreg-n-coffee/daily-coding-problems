/*
Implement locking in a binary tree. 
A binary tree node can be locked or unlocked 
only if all of its descendants or ancestors are not locked.

Design a binary tree node class with the following methods:

    1. is_locked, which returns whether the node is locked
    2. lock, which attempts to lock the node. 
        If it cannot be locked, then it should return false. 
        Otherwise, it should lock it and return true.
    3. unlock, which unlocks the node. 
        If it cannot be unlocked, then it should return false. 
        Otherwise, it should unlock it and return true.

You may augment the node to add parent pointers or any other property you would like.

You may assume the class is used in a single-threaded program, 
so there is no need for actual locks or mutexes.

Each method should run in O(h), where h is the height of the tree.
*/

/*
Solution:
A way to implement this would be to augment each node with an is_locked attribute as well as a parent pointer. 
We can then implement the methods this way:

1.  is_locked simply returns the node’s attribute
2.  lock searches the node’s children and parents for a true is_locked attribute. 
    If it is set to true on any of them, then return false. 
    Otherwise, set the current node’s is_locked to true and return true.
3.  unlock simply changes the node’s attribute to false. 
    If we want to be safe, then we should search the node’s children and parents as in lock to make sure we can actually unlock the node, 
    but that shouldn’t ever happen.
While is_locked is O(1) time, lock and unlock will take O(m + h) time 
where m is the number of nodes in the node’s subtree (since we have to traverse through all its descendants) 
and h is the height of the node (since we have to traverse through the node’s ancestors).

Tricks:
We can improve the performance of lock and unlock by adding another field 
to the node that keeps tracks of the count of locked descendants. 
That way, we can immediately see whether any of its descendants are locked. 
This will reduce our lock and unlock functions to only O(h). 
We can maintain this field by doing the following:

- When locking, if the locking succeeds, traverse the node’s ancestors and increment each one’s count
- When unlocking, traverse the node’s ancestors and decrement each one’s count 
*/

class LockingBinaryTreeNode {
    constructor(value, left = null, right = null, parent = null) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.isLocked = false;
        this.lockedDescendantsCount = 0;
    }

    canLockOrUnlock() {
        if (this.lockedDescendantsCount > 0) {
            return false;
        }

        // recursion of all ancestors
        let curr = this.parent;
        while (curr) {
            if (curr.isLocked) {
                return false;
            }
            curr = curr.parent;
        }

        return true;
    }

    isLocked() {
        return this.isLocked;
    }

    lock() {
        if (this.canLockOrUnlock()) {
            // not locked - so update isLocked and increment count in all ancestors
            this.isLocked = true;

            let curr = this.parent;
            while (curr) {
                curr.lockedDescendantsCount++;
                curr = curr.parent;
            }

            return true;
        } else {
            return false;
        }
    }

    unlock() {
        if (this.canLockOrUnlock()) {
            this.isLocked = false;

            let curr = this.parent;
            while (curr) {
                curr.lockedDescendantsCount--;
                curr = curr.parent;
            }

            return true;
        } else {
            return false;
        }
    }
}

// driver code 
const node = new LockingBinaryTreeNode(0);

node.left = new LockingBinaryTreeNode(1, null, null, node);
node.right = new LockingBinaryTreeNode(2, null, null, node);

node.left.left = new LockingBinaryTreeNode(3, null, null, node.left);
node.left.right = new LockingBinaryTreeNode(4, null, null, node.left);

console.log(node);

// lock node.left.right
console.log(node.left.right.lock());
console.log(node);

// try to lock node.left
console.log(node.left.lock());
