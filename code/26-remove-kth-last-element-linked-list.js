/*
Given a singly linked list and an integer k, remove the kth last element from the list. 
k is guaranteed to be smaller than the length of the list.

The list is very long, so making more than one pass is prohibitively expensive.

Do this in constant space and in one pass.
*/

class Node {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }

    print() {
        let current = this;

        while (current) {
            console.log(current.val);

            current = current.next;
        }
    }
}

function kthLast(node, k) {
    let count = 0;
    let p0 = node;
    let current = node;

    while (current) {
        count += 1;
        if (count > k) {
            p0 = p0.next;
        }

        current = current.next;
    }

    return p0.val;
}

const node = new Node(1);
node.next = new Node(2);
node.next.next = new Node(3);
node.next.next.next = new Node(4);
node.next.next.next.next = new Node(5);

node.print();

console.log(kthLast(node, 2));
