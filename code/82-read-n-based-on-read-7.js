/*
Using a read7() method that returns 7 characters from a file, 
implement readN(n) which reads n characters.

For example, given a file with the content “Hello world”, 
three read7() returns “Hello w”, “orld” and then “”.
 */

// a Read7 simulator implementation
class Read7 {
    constructor() {
        this.count = 0;
        this.zero = 'Hello w';
        this.one = 'orld';
        this.two = '!';
    }

    read() {
        switch (this.count % 3) {
            case 0:
                this.count++;
                return this.zero;
            case 1:
                this.count++;
                return this.one;
            case 2:
                this.count++;
                return this.two;
        }
    }
}

// intuition: keep track of a remainder string
(() => { 
    const read7 = new Read7();
    console.log('--' + read7.read() + '--');
    console.log('--' + read7.read() + '--');
    console.log('--' + read7.read() + '--');
    console.log('--' + read7.read() + '--');
    console.log('--' + read7.read() + '--');
    console.log('--' + read7.read() + '--');
    console.log('\n');

    class Reader {
        constructor() {
            this.remainder = '';
        }

        readN(n) {
            let result = this.remainder;
            let text = null;

            while (result.length < n && (text === null || text.length >= 5)) {
                text = read7.read();
                result += text;
            }

            this.remainder = result.slice(n);  // getting the string from n to the end

            return result.slice(0, n);
        }
    }

    const reader = new Reader();
    console.log('--' + reader.readN(4) + '--');
    console.log('--' + reader.readN(4) + '--');
    console.log('--' + reader.readN(4) + '--');
})();
