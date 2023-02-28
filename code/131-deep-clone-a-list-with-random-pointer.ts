/*
    Given the head to a singly linked list, 
    where each node also has a “random” pointer that points to anywhere in the linked list, 
    deep clone the list. (Unlike the shallow copy, a deep copy is a fully independent copy of an object)
 */

// Straightforward solution - disregarding the random pointer - O(n): Time and space complexity
(() => { 
    class Node {
        val: number;
        next: Node | null;
        random: Node | null;

        constructor(val: number, next: Node | null = null) {
            this.val = val;
            this.next = next;
            this.random = null;
        }
    }

    function clone(node: Node) {
        if (!node) return null;

        const result = [];
        let current: Node | null = node;

        while (current) {
            result.push(current.val);
            current = current.next;
        }

        return constructList(result);

        function constructList(array: number[]) {
            const head = new Node(array[0]);
            let current: Node | null = head;

            for (let i = 1; i < array.length; i++) { 
                current.next = new Node(array[i]);
                current = current?.next;
            }

            return head;
        }
    }

    const list = new Node(5);
    list.next = new Node(4);
    list.next.next = new Node(3);
    list.next.next.next = new Node(2);
    list.next.next.next.next = new Node(1);

    clone(list);
})();
