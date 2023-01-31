/*

Determine whether a doubly linked list is a palindrome. What if it’s singly linked?

For example, 1 -> 4 -> 3 -> 4 -> 1 returns True while 1 -> 4 returns False.

 */

(() => { 
    class DoublyLinkedList {
        val: number;
        prev: null | DoublyLinkedList;
        next: null | DoublyLinkedList;

        constructor(val: number) {
            this.val = val;
            this.prev = null;
            this.next = null;
        }
    }

    // a function to insert a new node in the front of the list
    function insert(head: DoublyLinkedList, val: number) {
        // create a new node in the front 
        const newNode = new DoublyLinkedList(val);
        newNode.next = head;
        newNode.prev = null;
        // if current head exists, the soon-to-be-replaced head's prev val is the new node
        if (head !== null) {
            head.prev = newNode;
        }
        // now set the head to the new node
        head = newNode;
        // return the new head
        return head;
    }

    // Distinguish a linked list is a palindrome - TC: O(n) SC: O(1)
    const isPalindrome = (left: any): boolean => { 
        if (left === null) {
            return true;
        }

        // find rightmost node in the list
        let right: any = left;
        while (right.next !== null) {
            right = right.next;
        }

        while (left !== right) {
            if (left.val !== right.val) {
                return false;
            }

            left = left.next;
            right = right.prev;
        }

        return true;
    };

    (() => { 
        let myList = new DoublyLinkedList(1);
        myList = insert(myList, 4);
        myList = insert(myList, 3);
        myList = insert(myList, 4);
        myList = insert(myList, 1);
        console.log(myList);

        let anotherList = new DoublyLinkedList(4);
        anotherList = insert(anotherList, 1);
        console.log(anotherList);

        console.log('myList palindrome?', isPalindrome(myList));
        console.log('anotherList palindrome?', isPalindrome(anotherList));
    })();
})();