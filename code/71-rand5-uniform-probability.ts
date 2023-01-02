/*
Using a function rand7() that returns an integer from 1 to 5 (inclusive) with uniform probability, 
implement a function rand5() that returns an integer from 1 to 7 (inclusive).
*/

const randomNumber = () => {
    // Math.random() * 7 + 1 generates a random float number from 1 (inclusive) to 8 (exclusive)
    // after flooring the float number, it will generate integers from 1 to 7 (both inclusive) - in uniform probability
    const rand7 = () => Math.floor(Math.random() * 7 + 1);

    const rand5 = (): number => { 
        let result = rand7();
        if (result >= 1 && result <= 5) {
            return result;
        }
        return rand5();
    };
};

// O(Infinity) TC