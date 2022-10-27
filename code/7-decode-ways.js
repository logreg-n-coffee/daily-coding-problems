/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = function (s) {
  const memo = new Map();

  function recursiveWithMemo(index, s) {
    if (memo.has(index)) {
      return memo.get(index);
    }

    if (index === s.length) {
      return 1;
    }

    if (s.charAt(index) === '0') {
      return 0;
    }

    if (index === s.length - 1) {
      return 1;
    }

    let ans = recursiveWithMemo(index + 1, s);

    if (parseInt(s.substring(index, index + 2)) <= 26) {
      ans += recursiveWithMemo(index + 2, s);
    }

    memo.set(index, ans);

    return ans;
  }

  return recursiveWithMemo(0, s);
};

console.log(numDecodings('12'));