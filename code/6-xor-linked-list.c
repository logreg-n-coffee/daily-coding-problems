/**
 * An XOR linked list is a more memory efficient doubly linked list.
 * Instead of each node holding next and prev fields, it holds a field named both,
 * which is an XOR of the next node and the previous node.
 *
 * Implement an XOR linked list; it has an add(element) which adds the element to the end,
 * and a get(index) which returns the node at index.
 * If using a language that has no pointers (such as Python),
 * you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.
 *
 * https://en.wikipedia.org/wiki/XOR_linked_list
 *
 *  ...  A        B         C         D         E  ...
          ⇌      A⊕C   ⇌   B⊕D   ⇌   C⊕E   ⇌
 * link(A) = NULL ^ addr(B)        // bitwise XOR of NULL with address of node B
 * link(B) = addr(A) ^ addr(C)     // bitwise XOR between the address of node A and C
 * link(C) = addr(B) ^ addr(D)     // bitwise XOR between the address of node B and D
 * link(D) = addr(C) ^ NULL        // bitwise XOR of the address of node A with NULL
 */

/*
var node = function(data, xor){
  this.data = data;
  this.xor = xor;
}

var pointerFactory = function(){
    var pointers = {};
    var pointerCount = 0;
    this.get_pointer = function(node){
        if (pointers.hasOwnProperty(node)) return pointers[node];
        pointerCount++;
        pointers[node]=pointerCount;
        pointers[pointerCount]=node;
        return pointerCount;
    }
    this.dereference_pointer = function(pointer){
        return (pointers.hasOwnProperty(pointer)) ? pointers[pointer] : null;
    }
}

var myNode = new node('my data', 0);
var pf = new pointerFactory();
var p = pf.get_pointer(myNode);
console.log(pf.dereference_pointer(p).data); // my data
console.log(pf.dereference_pointer(2)); //null
console.log(0 ^ p);  // 1
console.log(p ^ p);  // 0
*/

/**
 * An XOR linked list is a more memory efficient doubly linked list.
 * Instead of each node holding next and prev fields, it holds a field named both,
 * which is an XOR of the next node and the previous node.
 *
 * Implement an XOR linked list; it has an add(element) which adds the element to the end,
 * and a get(index) which returns the node at index.
 * If using a language that has no pointers (such as Python),
 * you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.
 *
 * https://en.wikipedia.org/wiki/XOR_linked_list
 *
 *  ...  A        B         C         D         E  ...
          ⇌      A⊕C   ⇌   B⊕D   ⇌   C⊕E   ⇌
 * link(A) = NULL ^ addr(B)        // bitwise XOR of NULL with address of node B
 * link(B) = addr(A) ^ addr(C)     // bitwise XOR between the address of node A and C
 * link(C) = addr(B) ^ addr(D)     // bitwise XOR between the address of node B and D
 * link(D) = addr(C) ^ NULL        // bitwise XOR of the address of node A with NULL
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

// Data structure to store a XOR linked list node
struct Node
{
    int data;
    struct Node *link;
};

// Helper function to return XORed addresses of `x` and `y` (XOR symbol: ^)
// (struct Node *) is the return type of the function
struct Node *XOR(struct Node *x, struct Node *y)
{
    return (struct Node *)((uintptr_t)(x) ^ (uintptr_t)(y));
}

// Helper function to traverse the list in a forward direction
void traverse(struct Node *head)
{
    struct Node *curr = head;
    struct Node *prev = NULL;
    struct Node *next;

    while (curr != NULL)
    {
        printf("%d -> ", curr->data);

        // `next` node would be xor of the address of the previous node
        // and current node link
        next = XOR(prev, curr->link);

        // update `prev` and `curr` pointers for the next iteration of the loop
        prev = curr;
        curr = next;
    }

    printf("NULL\n");
}

// TODO: function to append a node to the end of the list - traverse the list and append
void append(struct Node *head, int data)
{
    struct Node *curr = head;
    struct Node *prev = NULL;
    struct Node *next;

    // check if the list is empty
    while (curr != NULL)
    {
        next = XOR(prev, curr->link);

        prev = curr;
        curr = next;
    }

    // get the pointer to the next node
    struct Node *newNode = (struct Node *)malloc(sizeof(newNode));
    newNode->data = data;

    // link the newNode to its previous node (curr)
    curr->link = newNode;
}

// get function returns the node at the given index, return type struct Node
int get(int index, struct Node *head)
{
    // use a counter to save the index we are currently at
    int counter = 0;

    // traverse from the head of the list head
    struct Node *curr = head;
    struct Node *prev = NULL;
    struct Node *next;

    while (curr != NULL & counter < index)
    {

        // calculate the next pointer based on the prev pointer and the curr point
        next = XOR(prev, curr->link);

        // update 'prev' and 'curr' pointers for the next iteration of the loop
        prev = curr;
        curr = next;

        printf("get(): current data: %d\n", curr->data);

        counter++;
    }

    return curr->data;
}

// Helper function to insert a node at the beginning of the XOR linked list
void insert(struct Node **head, int data)
{
    // allocate a new list node (by assigning it an address) and set its data
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = data;

    // The link field of the new node is XOR of the current head and `NULL`
    // since a new node is being inserted at the beginning
    newNode->link = XOR(*head, NULL);

    // update link value of the current head node if the linked list is not empty
    if (*head)
    {
        // *(head)->link is XOR of `NULL` and address of the next node.
        // To get the address of the next node, XOR it with `NULL`
        (*head)->link = XOR(newNode, XOR((*head)->link, NULL));
    }

    // update the head pointer
    *head = newNode;
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4, 5};
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node *head = NULL;

    for (int i = n - 1; i >= 0; i--)
    {
        insert(&head, keys[i]);
    }

    // append(head, 6);

    traverse(head);

    // get node at index 2
    printf("get(2): %d\n", get(2, head));

    return 0;
}
