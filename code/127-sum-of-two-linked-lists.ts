/* 
    Let's represent an integer in a linked list format by having each node represent a digit in the number. 
    The nodes make up the number in reversed order.

    For example, the following linked list:

    1 -> 2 -> 3 -> 4 -> 5
    is the number 54321.

    Given two linked lists in this format, return their sum in the same linked list format.

    For example, given

    9 -> 9
    5 -> 2
    return 124 (99 + 25) as:

    4 -> 2 -> 1
 */

(() => { 
    class ListNode {
        val: number;
        next: ListNode | null;

        constructor(val: number, next: ListNode | null = null) { 
            this.val = val;
            this.next = next;
        }
    }

    const addLinkedLists =
        (list1: ListNode, list2: ListNode) => { 
            return constructList(
                digitalize(list1) + digitalize(list2)
            );


            function digitalize(list: ListNode): number {
                if (!list) return 0;
                
                let nth = 1;
                let sum = 0;

                while (list) {
                    sum += list.val * nth;
                    nth *= 10;
                    list = list.next!;
                }

                return sum;
            }

            function constructList(num: number): ListNode { 
                const numStr = String(num);

                const resultList = new ListNode(Number(numStr[numStr.length - 1]));
                let curr = resultList;

                for (let i = numStr.length - 2; i >= 0; i--) { 
                    curr.next = new ListNode(Number(numStr[i]))
                    curr = curr.next;
                }

                return resultList;
            }

        };
    
    const list1 = new ListNode(1);
    list1.next = new ListNode(2);
    list1.next.next = new ListNode(3);
    list1.next.next.next = new ListNode(4);
    list1.next.next.next.next = new ListNode(5);

    const list2 = new ListNode(5);
    list2.next = new ListNode(4);
    list2.next.next = new ListNode(3);
    list2.next.next.next = new ListNode(2);
    list2.next.next.next.next = new ListNode(1);

    const list3 = new ListNode(9);
    list3.next = new ListNode(9);

    const list4 = new ListNode(5);
    list4.next = new ListNode(2)

    console.log(addLinkedLists(list1, list2));
    console.log(addLinkedLists(list3, list4));
    
})();