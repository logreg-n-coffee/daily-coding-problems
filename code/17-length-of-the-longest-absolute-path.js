/**
 * 
 * Suppose we represent our file system by a string in the following manner:
 * 
 * The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:
 * 
 * dir
 *     subdir1
 *     subdir2
 *         file.ext
 * The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.
 * 
 * The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:
 * 
 * Hint: \n is new line; \t is tab
 * 
 * dir
 *     subdir1
 *         file1.ext
 *         subsubdir1
 *     subdir2
 *         subsubdir2
 *             file2.ext
 * The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.
 * 
 * We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).
 * 
 * Given a string representing the file system in the above format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0.
 * 
 * Note:
 * 
 * The name of a file contains at least a period and an extension.
 * 
 * The name of a directory or sub-directory will not contain a period.
 */

// Solution: first parse the string representing the file system (into json) and then get the longest absolute path to a file.

function buildFileSystem(input) {
    const fs = {};
    const files = input.split('\n');  // '\n' is a single character

    let currentPath = [];

    for (let f of files) {
        let indentation = 0;
        while (f.slice(0, 2).includes('\t')) {
            indentation++;
            f = f.slice(1);
        }

        let currentNode = fs;

        for (const subdir of currentPath.slice(0, indentation)) {
            currentNode = currentNode[subdir];
        }

        if (f.includes('.')) {
            currentNode[f] = true;
        } else {
            currentNode[f] = {};
        }

        currentPath = currentPath.slice(0, indentation);
        currentPath.push(f);

    }

    return fs;
}

const myFs = buildFileSystem(
    'dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext'
);

console.log('myFs: ', myFs);
console.log(JSON.stringify(myFs, null, '\t'));


function longestPath(node) {

    const getPaths = (node) => {
        let paths = [];

        for (const [key, value] of Object.entries(node)) {
            if (value && typeof value === 'object') {
                paths.push(...getPaths(value).map(p => `${key}/${p}`));
            } else {
                paths.push(key);
            }
        }

        return paths;
    };

    const paths = getPaths(node);

    // debug 
    console.log(paths);

    const longest = Math.max(...paths.map(path => path.length));

    return longest;

}

console.log(longestPath(myFs));
