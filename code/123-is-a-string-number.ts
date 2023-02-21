/* 
    Given a string, return whether it represents a number. Here are the different kinds of numbers:

    "10", a positive integer
    "-10", a negative integer
    "10.1", a positive real number
    "-10.1", a negative real number
    "1e5", a number in scientific notation

    And here are examples of non-numbers:

    "a"
    "x 1"
    "a -2"
    "-"
 */

(() => { 
    const isNumber = (s: string): boolean => { 
        return (
            isPositiveNumber(s) ||
            isNegativeNumber(s) ||
            isScientificNumber(s)
        );

        function isPositiveNumber(s: string): boolean { 
            return isPositiveInteger(s) || isPositiveReal(s);
        }
        function isNegativeNumber(s: string): boolean { 
            return isNegativeInteger(s) || isNegativeReal(s);
        }
        function isScientificNumber(s: string): boolean { 
            if ([...s].filter(x => x === 'e').length !== 1) {
                return false;
            }

            const [beforeE, afterE] = s.split('e');

            return (
                (isPositiveNumber(beforeE) || isNegativeNumber(beforeE)) &&
                (isPositiveNumber(afterE) || isNegativeNumber(afterE))
            );
        }

        // positive ints and reals
        function isPositiveInteger(s: string): boolean { 
            for (let i = 0; i < s.length; i++) { 
                if (s >= '0' && s <= '9') { 
                    return true; 
                }
            }
            return false;
            }
        function isPositiveReal(s: string): boolean {
            if ([...s].filter(x => x === '.').length !== 1) {
                return false;
            }

            const [integer, decimal] = s.split('.');

            return isPositiveInteger(integer) && isPositiveInteger(decimal)
        }

        // negative ints and reals
        function isNegativeInteger(s: string): boolean { 
            return s[0] === '-' && isPositiveInteger(s.slice(1));
        }
        function isNegativeReal(s: string): boolean { 
            return s[0] === '-' && isPositiveReal(s.slice(1));
        }
    };

    // print 5 trues
    console.log(isNumber('10'));
    console.log(isNumber('-10'));
    console.log(isNumber('10.1'));
    console.log(isNumber('-10.1'));
    console.log(isNumber('1e5'));

    // print 4 falses
    console.log(isNumber('a'));
    console.log(isNumber('x 1'));
    console.log(isNumber('a -2'));
    console.log(isNumber('-'));

    /*
        A positive integer contains only digits.
        A negative integer starts with '-' and the rest is a positive integer.
        A positive decimal contains one '.' and the substrings before and after '.' are positive integers.
        A negative decimal starts with '-' and the rest is a positive decimal.
        A positive number is either a positive integer or decimal.
        A negative number is either a negative integer or decimal.
        A scientific notation number contains one 'e' and the substrings before and after 'e' are each either a positive or negative number.
        And finally, a number is either a positive number, a negative number, or a scientific number.
     */
})();