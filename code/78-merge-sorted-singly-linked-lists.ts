/*
Given k sorted singly linked lists, 
write a function to merge all the lists into one sorted singly linked list.
*/

class SinglyLinkedListNode {
    data: any;
    next: SinglyLinkedListNode | null;

    constructor(data: any) {
        this.data = data;
        this.next = null;
    }

    print() {
        let current: SinglyLinkedListNode | null = this;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}

/**
 * merge all the inherently sorted lists into one sorted singly linked list with brute force
 * @param nodes 
 * @return a sorted singly linked list
 */
const mergeListsSlow = (nodes: SinglyLinkedListNode[]): SinglyLinkedListNode | null => { 
    const arr: number[] = [];
    const newHead: SinglyLinkedListNode = new SinglyLinkedListNode(-1); // put a dummy head

    for (const node of nodes) {
        let curr: SinglyLinkedListNode | null = node;
        while (curr) {
            arr.push(curr.data);
            curr = curr.next;
        }
    }

    // recreate the linked list 
    let current = newHead;
    for (const num of arr.sort((a, b) => a - b)) {
        current.next = new SinglyLinkedListNode(num);
        current = current.next;
    }

    return newHead.next;
};
// Brute Force: gather all the values of the linked lists into one large array,
// sort the array, and then recreate a linked list with the values from the array.
// O(KN log KN) time and O(KN) space, where K is the number of lists and N is the number of elements in the largest list.


/**
 * merge all the inherently sorted lists into one sorted singly linked list with brute force
 * @param nodes 
 * @return a sorted singly linked list
 */
const mergeListsFast = (nodes: SinglyLinkedListNode[] | null[] | undefined[]): SinglyLinkedListNode | null => { 
    const newHead: SinglyLinkedListNode = new SinglyLinkedListNode(-1); // create a dummy head
    let current: SinglyLinkedListNode | null  = newHead;

    // while all of the node head are not null
    while (!(nodes as any[]).every((node) => node === null || node === undefined)) {
        // get min of all non-null lists
        const values = nodes.map(node => node?.data);
        const currMin = Math.min(...values.filter(node => node !== null && node !== undefined));
        const currMinIdx = nodes.findIndex(node => node?.data === currMin);
 
        nodes[currMinIdx] = nodes[currMinIdx]?.next;
        current.next = new SinglyLinkedListNode(currMin);
        current = current.next;
    }

    return newHead.next;
};
// Inherent Sortedness: keep track of current location in each linked list, pick the mim of all the pointers
// Once we've picked one, we can move that pointer up.
// O(KN * K) time and O(K) space

// driver code 
(() => { 
    const listOne = new SinglyLinkedListNode(0);
    listOne.next = new SinglyLinkedListNode(1);
    listOne.next.next = new SinglyLinkedListNode(2);
    listOne.next.next.next = new SinglyLinkedListNode(3);
    listOne.print();
    console.log('\n');

    const listTwo = new SinglyLinkedListNode(2);
    listTwo.next = new SinglyLinkedListNode(5);
    listTwo.next.next = new SinglyLinkedListNode(9);
    listTwo.next.next.next = new SinglyLinkedListNode(10); 
    listTwo.print();
    console.log('\n');

    const listThree = new SinglyLinkedListNode(8);
    listThree.next = new SinglyLinkedListNode(9);
    listThree.next.next = new SinglyLinkedListNode(11);
    listThree.next.next.next = new SinglyLinkedListNode(12); 
    listThree.print();
    console.log('\n');

    const nodes = [listOne, listTwo, listThree];

    // mergeListsSlow(nodes)?.print();
    mergeListsFast(nodes)?.print();
})();