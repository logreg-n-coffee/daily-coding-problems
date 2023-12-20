from collections import OrderedDict


# O(1) time complexity: __init__, get, and put are O(1)
# O(n) space complexity: size of the cache
class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()  # cache to store key-value pairs
        self.capacity = capacity  # max capacity of cache

    def get(self, key: int) -> int:
        # if key is in the cache, move it to the end
        if key in self.cache:
            self.cache.move_to_end(key)
            return self.cache[key]
        return -1

    def put(self, key: int, value: int) -> None:
        # if key is in the cache, move it to the end
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        # if the cache is full, pop the first item (least recently used)
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
