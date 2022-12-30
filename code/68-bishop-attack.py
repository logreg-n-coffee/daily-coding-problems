from collections import defaultdict

TOP_LEFT_TO_BOTTOM_RIGHT = 0
TOP_RIGHT_TO_BOTTOM_LEFT = 1

def combos(num):
    return num * (num - 1) / 2

def pairs(bishops, m):
    counts = defaultdict(int)
    for r, c in bishops:
        top_lr, top_lc = (r - min(r, c), c - min(r, c))
        top_rr, top_rc = (r - min(r, m - c), c + min(r, m - c))

        counts[top_lr, top_lc, TOP_LEFT_TO_BOTTOM_RIGHT] += 1
        counts[top_rr, top_rc, TOP_RIGHT_TO_BOTTOM_LEFT] += 1
        
    return sum(combos(c) for c in counts.values())

my_bishops = [
    (0, 0),
    (1, 2),
    (2, 2),
    (4, 0),
]

m = 5

print(pairs(my_bishops, m))
