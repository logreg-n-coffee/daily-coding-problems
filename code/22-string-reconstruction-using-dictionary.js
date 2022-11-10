/**
 * Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. 
 * If there is more than one possible reconstruction, return any of them. 
 * If there is no possible reconstruction, then return null.
 * 
 * For example, given the set of words 'quick', 'brown', 'the', 'fox', 
 * and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
 * 
 * Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", 
 * return either ['bed', 'bath', 'and', 'beyond'] or ['bedbath', 'and', 'beyond'].
 */

function originalSentenceConstruction(words, string) {
    // buffer and foundWords
    let buffer = '';
    let foundWords = [];
    // initialize a set to store the values
    const wordSet = new Set();
    // populate the set with the words for O(1) access
    words.forEach((word) => wordSet.add(word));
    
    // search for words in the string 
    for (const char of string) {
        buffer += char;
        if (wordSet.has(buffer)) {
            foundWords.push(buffer);
            buffer = '';
        }
    }

    if (foundWords.length === 0) return null;
    return foundWords;
    
}

console.log(
    originalSentenceConstruction(
        ['quick', 'brown', 'the', 'fox'],
        'thequickbrownfox'
    )
);

console.log(
    originalSentenceConstruction(
        ['bed', 'bath', 'bedbath', 'and', 'beyond'],
        'bedbathandbeyond'
    )
);
