/*

Given a string of words delimited by spaces, reverse the words in string. 
For example, given "hello world here", return "here world hello"

Follow-up: given a mutable string representation, can you perform this operation in-place?

 */

(() => { 
    // solve the problem with string reconstruction
    const reverse = (sentence: string): string => { 
        const words = sentence.split(' ');
        return words.reduce((acc, word) => word + ' ' + acc, '');
        // also: return words.reverse().join(' ');
    };

    console.log(reverse('hello world here'));
})();
