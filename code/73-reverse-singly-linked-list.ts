/*
Given the head of a singly linked list, reverse it in-place.
*/

class ListNode {
    data: any;
    next: ListNode | null;

    constructor(data: any) {
        this.data = data;
        this.next = null;
    }

    add(data: any) {
        if (this.next === null) {
            const newNode: ListNode = new ListNode(data);
            this.next = newNode;
            return newNode;
        } else {
            console.log(
                'Unable to add a node to this node as the next node already exists.'
            );
            return null;
        }
    }
}

// a function to reverse the list - TC: O(n) SC: O(1)
function reverse(node: ListNode | null) {
    // keep track of current pointer and previous pointer
    let prev = null;
    let curr = node;
    let temp;

    while (curr !== null) {
        temp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = temp;
    }

    return prev;
}

const myNode = new ListNode(0);
const first = myNode.add(1);
const second = first?.add(2);
const third = second?.add(3);

console.log(myNode);
console.log(reverse(myNode));
