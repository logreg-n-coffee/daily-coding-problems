/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = function (s) {
  // create a memo hashmap to save the results 
  const memo = new Map();

  function recursiveWithMemo(index, s) {
    // see if we already solved the problem with computed vlue
    if (memo.has(index)) {
      return memo.get(index);
    }

    // if the index is equal to the length of the string, we hit the end
    // no more solutions - return 1 - a valid answer
    if (index === s.length) {
      return 1;
    }

    // nothing should start with 0 (attention this is a string), then we can return 0
    if (s.charAt(index) === '0') {
      return 0;
    }

    // at the last character of the string, there should be one solution
    if (index === s.length - 1) {
      return 1;
    }

    // recursive part - get the answe from index + 1
    let ans = recursiveWithMemo(index + 1, s);

    // look at two digits/characters
    // as for the boundary case, substring is right-boundary exclusive 
    // we also checked index === s.length - 1, so it is guaranteed we will not go out of boundary
    if (parseInt(s.substring(index, index + 2)) <= 26) {
      // if the number is no larger than 26, we have two digits to use
      // add the answer with the recursive call
      ans += recursiveWithMemo(index + 2, s);
    }

    memo.set(index, ans);

    return ans;
  }

  return recursiveWithMemo(0, s);
};

console.log(numDecodings('12'));

// Time: O(n) Make one recursive call per index and sometimes two for two letters
// Space: O(n) - as there is a memo 