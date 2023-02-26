/* 
    Given a real number n, find the square root of n. For example, given n = 9, return 3.
 */

// solve the square root problem with Heron of Alexandria's Algorithm
(() => { 
    const squareRoot = (n: number, epsilon = 1.0e-10): number => { 
        let guess = 1;

        while (Math.abs(guess ** 2 - n) >= epsilon) { 
            guess = (guess + n / guess) / 2;
        }

        return guess;
    };

    console.log(squareRoot(9));
})();

// solve with binary search 
(() => { 
    const squareRoot = (n: number, epsilon = 1.0e-15): number => { 
        let low = 0;
        let high = n;
        let guess = (low + high) / 2;

        while (Math.abs(guess ** 2 - n) >= epsilon) {
            if (guess ** 2 > n) {
                high = guess;
            } else {
                low = guess;
            }
            guess = (low + high) / 2
        }

        return guess;
    };

    console.log(squareRoot(9));
})();

// solve with math property -> x = e**(ln(x)) => sqrt(s) = e**(ln(sqrt(s))) = e**(1/2*ln(s))
(() => { 
    const squareRoot = (n: number): number => { 
        return (Math.E ** (1 / 2 * Math.log(n)));
    };

    console.log(squareRoot(9));
})();