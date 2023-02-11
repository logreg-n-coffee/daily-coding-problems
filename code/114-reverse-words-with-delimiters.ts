/* 
Given a string and a set of delimiters, reverse the words in the string while maintaining the relative order of the delimiters. 
For example, given "hello/world:here", return "here/world:hello"

Follow-up: Does your solution work for the following cases: "hello/world:here/", "hello//world:here"
 */

(() => { 
    function reverseWordsWithDelimiters(inputString: string, delimiters: string): string {
        // result array 
        const result = [];

        // use regex to match the words and delimiters (special characters)
        const splitted: string[] = inputString.match(new RegExp(`[\\w]+|[${delimiters}]+`, 'g')) || [];

        // build words stack
        const words: string[] = inputString.match(/[\w]+/g) || [];
        const stack: string[] = [...words];  // copy a stack to mutate the stack

        // go through the original splitted 
        for (const str of splitted) {
            // if the str is in the words list then it is a word not special character(s)
            if (words.includes(str)) { 
                // pop the word from the words list and add it to result
                result.push(stack.pop());
            } else {
                // if the str is not in the words list then it is special character(s)
                result.push(str);
            }
        }

        return result.join('');
    }

    // time/space complexity: O(n)
    console.log(reverseWordsWithDelimiters('hello/world:here', '/:'));  // Output: 'here/world:hello'
    console.log(reverseWordsWithDelimiters('hello/world:here/', '/:'));  // Output: 'here/world:hello/'
    console.log(reverseWordsWithDelimiters('hello//world:here', '/:'));  // Output: 'here//world:hello'
})();