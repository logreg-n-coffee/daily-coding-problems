/*
Given a string of round, curly, and square open and closing brackets, 
return whether the brackets are balanced (well-formed).

For example, given the string "([])[]({})", you should return true.

Given the string "([)]" or "((()", you should return false.

We will be sending the solution tomorrow, along with tomorrow's question. 
As always, feel free to shoot us an email if there's anything we can help with.
 */

const balancedBrackets = (string) => {
    const openingBrackets = '({[';
    const closingBrackets = ')}]';
    const matchingBrackets = {
        ')': '(',
        '}': '{',
        ']': '[',
    };

    const stack = [];

    for (const char of string) {
        if (openingBrackets.includes(char)) {
            stack.push(char);
        } else if (closingBrackets.includes(char)) {
            if (stack.length === 0) {
                return false;
            } 
            if (stack[stack.length - 1] === matchingBrackets[char]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return stack.length === 0;
};

console.log(balancedBrackets('([])[]({})'));
console.log(balancedBrackets('([)]'));
console.log(balancedBrackets('((()'));
