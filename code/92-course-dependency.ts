/*
We're given a hashmap associating each courseId key with a list of courseIds values, 
which represents that the prerequisites of courseId are courseIds. 
Return a sorted ordering of courses such that we can finish all courses.

Return null if there is no such ordering.

For example, given 
{'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100'], 'CSC100': []}, 

should return ['CSC100', 'CSC200', 'CSCS300'].

 */

// intuition: question 41 - flight itinerary

interface HashMap {
    [key: string]: string[];
}

const topologicalSort = (courses: HashMap): string[] | null => { 
    
    // step 1: create a list of courses without prerequisites
    const courseWithNoPrereqs =
        Object.keys(courses).filter(course => !courses[course].length);
    
    // step 2: initialize an empty list for results
    const result = [];

    // step 3: while the list of courses without prerequisites is not empty
    while (courseWithNoPrereqs.length > 0) {
        // a. remove a course from the list
        const currentCourse: string = courseWithNoPrereqs.pop() as string;
        // b. add it to the result list 
        result.push(currentCourse);
        // c. for each course in the hashmap that has the removed course as a prerequisite,
        // remove that prerequisite
        for (const course in courses) {
            if (courses[course].indexOf(currentCourse) !== -1) {
                courses[course].splice(courses[course].indexOf(currentCourse), 1);
                if (!courses[course].length) {
                    courseWithNoPrereqs.push(course);
                }
            }
        }
    }

    // step 4: if the hashmap is not empty at this point, there will be no ordering that can
    // finish all courses, return null
    if (Object.values(courses).filter(c => c.length !==0).length !== 0) {
        return null;
    }

    // step 5: otherwise, return the result list
    return result;
};

// driver code
(() => { 
    const courses = {'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100'], 'CSC100': []};
    console.log(topologicalSort(courses)); // Output: ['CSC100', 'CSC200', 'CSC300']
})();

/*
This problem can be solved using a topological sort algorithm. 
Topological sort is an algorithm for ordering a directed acyclic graph (DAG), 
such that for every edge (u, v) from vertex u to vertex v, u comes before v in the ordering.

Here is the general idea of the algorithm:

1. Create a list of courses with no prerequisites (i.e., courses that are in the values of the hashmap but not in the keys)
2. Initialize an empty result list
3. While the list of courses with no prerequisites is not empty:
    a. remove a course from the list
    b. add it to the result list
    c. for each course in the hashmap that has the removed course as a prerequisite, remove that prerequisite
If the hashmap is not empty at this point, there is no ordering that can finish all courses, so return null.
Otherwise, return the result list.
 */