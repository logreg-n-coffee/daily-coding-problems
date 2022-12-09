/*
Implement an LRU (Least Recently Used) cache. 
It should be able to be initialized with a cache size n, and contain the following methods:

1. set(key, value): sets key to value. 
   If there are already n items in the cache and we are adding a new item, then it should also remove the least recently used item.
2. get(key): gets the value at key. If no such key exists, return null.

Each operation should run in O(1) time.
*/

class Node {
    constructor(k, v) {
        this.key = k;
        this.val = v;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        // initialize LRU cache with size === capacity
        this.capacity = capacity;
        this.hashMap = new Map();

        // head and tail of the linked list
        this.head = new Node('#', 0);
        this.tail = new Node('-', 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        // return the value of the key, if it exists in cache

        if (this.hashMap.has(key)) {
            const node = this.hashMap.get(key);
            // remove the node from the doubly linked list
            this.#remove(node);
            // move it at the start
            this.#add(node);

            return node.val;
        }

        return -1;
    }

    set(key, value) {
        // update the value of the key if it exists 
        // this key becomes the most recently used one

        if (this.hashMap.has(key)) {
            // if already present, cache hit
            this.#remove(this.hashMap.get(key));
        }

        const newNode = new Node(key, value);

        // add the node at the start
        this.#add(newNode);

        this.hashMap.set(key, newNode);

        // if the number of keys exceeds the capacity, evict the least used key
        if (this.hashMap.size > this.capacity) {
            // remove the least used node
            const nodeToRemove = this.tail.prev;
            this.#remove(nodeToRemove);
            this.hashMap.delete(nodeToRemove.key);
        }

    }

    #remove(node) {
        const prevNode = node.prev;
        const nextNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }

    #add(node) {
        const nextNode = this.head.next;
        const prevNode = this.head;

        prevNode.next = node;
        nextNode.prev = next;

        node.next = nextNode;
        node.prev = prevNode;
    }
}

// TC: O(1) - fast access and fast updates - get and set
// SC: O(n) - for both doubly linked list and hashMap 
