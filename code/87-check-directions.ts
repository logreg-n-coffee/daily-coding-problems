/*

A rule looks like this:

A NE B

This means this means point A is located northeast of point B.

A SW C

means that point A is southwest of C.

Given a list of rules, check if the sum of the rules validate. For example:

A N B
B NE C
C N A
does not validate, since A cannot be both north and south of C.

A NW B
A N B
is considered valid.

 */

(() => { 
    type Rule = string;

    const N = 0;
    const E = 1;
    const S = 2;
    const W = 3;
    const DIRS = [N, E, S, W];
    const charToDir: Map<string, number> = new Map([
        ['N', N],
        ['E', E],
        ['S', S],
        ['W', W],
    ]);

    // vertex node
    class Node {
        value: string;
        edges: Array<Set<Node>>;

        constructor(value: string) {
            this.value = value;
            this.edges = [];
            for (let i = 0; i < 4; i++) {
                this.edges.push(new Set<any>());
            }
        }
    }

    /// driver code
    (() => { 
        (function test1() {
            const rules = [
                'A N B',
                'C SE B',
                'C N A',
            ];

            console.log(validateRules(rules));
        })();

        (function test2() {
            const rules = [
                'A NW B',
                'A N B',
            ];

            console.log(validateRules(rules));
        })();

        (function test3() {
            const rules = [
                'A N B',
                'C N B',
            ];

            console.log(validateRules(rules));
        })();
    })();
    /// 

    // validate rules 
    function validateRules (rules: Rule[]): boolean { 
        const map: Map<string, Node> = new Map<string, Node>();
        
        for (const rule of rules) {
            // from and to rules
            const r: string[] = rule.split(' ');
            console.log('rule: ', r[0], r[1], r[2]);

            // set the rule/convention:
            // an edge fromVertex DIR toVertex means toVertex is "DIR of" fromVertex
            // example: the rule A N B will be parsed into an N edge from B pointing to A, meaning A is North of B
            const fromVal = r[2].charAt(0);
            const toVal = r[0].charAt(0);

            if (!map.has(fromVal)) {
                map.set(fromVal, new Node(fromVal));
            }

            if (!map.has(toVal)) {
                map.set(toVal, new Node(toVal));
            }

            // get from and to nodes
            const from: Node = map.get(fromVal) as Node;
            const to: Node = map.get(toVal) as Node;

            // directions - r[1] might contain 1 character or 2 characters - treat diagonal directions as two separate rules
            for (const dirChar of r[1]) {
                const dir: number = charToDir.get(dirChar) as number;

                if (!isValid(from, to, dir)) return false;
                addEdges(from, to, dir);
                
                // console.log(from.edges[dir]);
                // console.log(to.edges[getOppositeDir(dir)]);
            }
        }

        return true;

        // check if any existing edges conflict with the new edge(s) we are adding
        function isValid(
            from: Node,
            to: Node,
            newDir: number,
        ): boolean { 
            const oppositeDir = getOppositeDir(newDir);
            if (from.edges[oppositeDir].has(to)) {
                return false;
            }

            return true;
        }
        
        function getOppositeDir(dir: number): number { 
            return (dir + 2) % 4;
        }

        function addEdges( 
            from: Node,
            to: Node,
            newDir: number,
        ): void {
            // get the opposite direction
            const oppositeDir = getOppositeDir(newDir);

            // add immediate edge between from and to nodes (using bi-directional edges)
            from.edges[newDir].add(to);
            to.edges[oppositeDir].add(from);

            for (const dir of DIRS) {
                // relationship of the same direction
                if (dir === newDir) continue;

                for (const neighbor of from.edges[dir]) {
                    // no need to add self-edge
                    if (neighbor === to) continue;

                    // add bi-directional edge between from and to nodes
                    neighbor.edges[newDir].add(to);
                    to.edges[oppositeDir].add(neighbor);
                }
            }
        }
    }
})();

// Time complexity: O(N * |V|) = O(N^2), where N is the number of rules.
// Space complexity: O(|V| + |E|) = O(|V| + |V|^2) = O(N^2), since we are creating a densely-connected graph.