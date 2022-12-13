/*
Implement a URL shortener with the following methods:

1. shorten(url), which shortens the url into a six-character alphanumeric string, such as zLg6wl.
2. restore(short), which expands the shortened string into the original url. If no such shortened string exists, return null.
Hint: What if we enter the same URL twice?
*/

class URLShortener {
    constructor() {
        this.tokenMap = new Map(); // token -> url
        this.usedUrlMap = new Map(); // url -> token
    }

    /**
     * generateRandomToken
     * @param {number} len
     * @returns {string}
     */
    #generateRandomToken(len = 6) {
        // return a random string on base 36 (0-9 and a-z)
        return Math.random()
            .toString(36)
            .substring(2, len + 2);
    }

    /**
     * generateUnusedToken
     * @returns {string}
     */
    #generateUnusedToken() {
        let t = this.#generateRandomToken();
        while (this.tokenMap.has(t)) {
            t = this.#generateRandomToken();
        }
        return t;
    }

    /**
     * shorten url
     * @param {string} url 
     * @returns {string} shortened token
     */
    shorten(url) {
        // if the url has been shortened before, retrieve it
        if (this.usedUrlMap.has(url)) {
            return this.usedUrlMap.get(url);
        }
        // if not generate a new token and record it to the maps
        const token = this.#generateUnusedToken();
        this.tokenMap.set(token, url);
        this.usedUrlMap.set(url, token);

        return token;
    }

    /**
     * restore the token
     * @param {*} token 
     * @returns 
     */
    restore(token) {
        return this.tokenMap.get(token);
    }
}

// driver code
const myUrlShortener = new URLShortener();

const google = 'https://www.google.com';
// shorten google for the first time
const token4Google = myUrlShortener.shorten(google);
// shorten google for the second time
const secondToken4Google = myUrlShortener.shorten(google);

const restoredUrl = myUrlShortener.restore(token4Google);

console.log(token4Google, secondToken4Google, restoredUrl);
