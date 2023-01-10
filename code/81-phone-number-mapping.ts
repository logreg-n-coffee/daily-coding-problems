/*

Given a mapping of digits to letters (as in a phone number), and a digit string, 
return all possible letters the number could represent. 
You can assume each valid number in the mapping is a **single digit**.

For example if {“2”: [“a”, “b”, “c”], "3": [“d”, “e”, “f”], …} 
then “23” should return [“ad”, “ae”, “af”, “bd”, “be”, “bf”, “cd”, “ce”, “cf"].

 */




const getPermutations = (map: Map<string, string[]>, digits: string): string[] => { 
    const result: string[] = [];

    const digit = digits[0];

    if (digits.length === 1) {
        return map.get(digit) || [];
    }

    for (const char of map.get(digit) as string[]) {
        for (const perm of getPermutations(map, digits.slice(1))) {
            result.push(char + perm);
        }
    }

    return result;
};


(() => { 
    const numberDigitMapping: Map<string, string[]> = new Map([
        ['1', ['']],
        ['2', ['a', 'b', 'c']],
        ['3', ['d', 'e', 'f']],
        ['4', ['g', 'h', 'i']],
        ['5', ['j', 'k', 'l']],
        ['6', ['m', 'n', 'o']],
        ['7', ['p', 'q', 'r', 's']],
        ['8', ['t', 'u', 'v']],
        ['9', ['w', 'x', 'y', 'z']],
    ]);
    
    console.log(numberDigitMapping);

    console.log(getPermutations(numberDigitMapping, '23'));
})();