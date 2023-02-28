class Node:
    def __init__(self, val):
        self.val = val
        self.next = None


def clone(node):
    node = double(node)
    set_random_pointers(node)

    clone_head = node.next

    while node:
        clone_match = node.next

        if clone_match.next:
            node.next, clone_match.next = node.next.next, clone_match.next.next
        else:
            node.next, clone_match.next = node.next.next, None

        node = node.next

    return clone_head


def set_random_pointers(node):
    while node:
        clone_match = node.next
        clone_match.random = node.random.next

        node = node.next.next


def double(node):
    root = node
    while node:
        copy = Node(node.val)
        next = node.next

        node.next = copy
        copy.next = next
        node = next

    return root
