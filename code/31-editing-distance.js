/*
The edit distance between two strings refers to the minimum number of 
character insertions, deletions, and substitutions required to change one string to the other. 

For example, the edit distance between “kitten” and “sitting” is three: substitute the “k” for “s”, substitute the “e” for “i”, and append a “g”.
Given two strings, compute the edit distance between them.
*/

// solution: https://medium.com/@ethannam/understanding-the-levenshtein-distance-equation-for-beginners-c4285a5604f0

const minDistance = (word1, word2) => {
    const n = word1.length;
    const m = word2.length;

    // if one of the strings is empty
    if (n * m == 0) {
        return n + m;
    }
      
    // array to store the convertion history
    const d = Array(m + 1).fill().map(() => Array(n + 1).fill());  // d[m + 1][n + 1]

    // init boundaries
    for (let i = 0; i < n + 1; i++) {
      d[i][0] = i;
    }
    for (let j = 0; j < m + 1; j++) {
      d[0][j] = j;
    }

    // DP compute 
    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < m + 1; j++) {
        let left = d[i - 1][j] + 1;
        let down = d[i][j - 1] + 1;
        let left_down = d[i - 1][j - 1];
        if (word1.charAt(i - 1) !== word2.charAt(j - 1))
          left_down += 1;
        d[i][j] = Math.min(left, Math.min(down, left_down));
      }
    }
    return d[n][m];
};

console.log(minDistance('kitten', 'sitting'));

// Time/Space Complexity: O(m * n)
