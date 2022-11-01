// Implement an autocomplete system. That is, given a query string s 
// and a set of all possible query strings, 
// return all strings in the set that have s as a prefix.
// For example, given the query string de and the set of strings [dog, deer, deal], 
// return [deer, deal].

// Hint: Try preprocessing the dictionary into a more efficient data structure 
// to speed up queries.

/**
 * given a query string s and a set of all possible query strings, 
 * return all strings in the set that have s as a prefix.
 * @param {string} s string
 * @param {Array} arr query string
 * @return {Array} an array / set of possible query strings
 */
const autocompleteSystem = (s, arr) => {
    const length = s.length;
    const result = arr.filter(elem => elem.slice(0, length) === s);
    return result;
};

console.log(autocompleteSystem('de', ['dog', 'deer','deal']));
// expect [deer, deal]