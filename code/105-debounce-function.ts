/* 
Given a function f, and N return a debounced f of N milliseconds.

That is, as long as the debounced f continues to be invoked, f itself will not be called for N milliseconds.

 */


/*
Knowledge:

When you type into a search input, there will be a delay before the typeahead results appear. 
This functionality is frequently controlled by a pattern called a debounce (it could also be a throttle function that has a similar outcome). 
The debounce function delays the processing of the keyup event until the user has stopped typing for a predetermined amount of time.

This prevents your UI code from needing to process every event and also drastically reduces the number of API calls sent to your server. 
Processing every character as it's entered could harm performance and add unnecessary load to your backend.
 */

// Returns a function, that as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being executed for
// `wait` milliseconds.

const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  return function executedFunction(...args: any[]) {

    // The callback function to be executed after
    // the debounce time has elapsed
    const later = () => {
      // clear the timeout to indicate the debounce ended
      // and make sure it is all cleaned up
      clearTimeout(timeout);

      // Execute the callback
      func(...args);
    };

    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    clearTimeout(timeout);

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value
    timeout = setTimeout(later, wait);
  };
};

// driver code 
(() => { 
    const WAIT_TIME = 5000; // 5 seconds
    const debouncedEventListiner = debounce(() => console.log('I executed'), WAIT_TIME);

    // time = 0
    debouncedEventListiner();
    // wait 2 seconds (time = 2)
    debouncedEventListiner();
    // wait 2 seconds (time = 4)
    debouncedEventListiner();
    // wait 2 seconds (time = 6)
    debouncedEventListiner();
    // do nothing for 5 seconds (time = 11)

    // Executes at time = 11 because previous executions reset it
    // executes callback at                      |
    // time                     0     5     10   11
})();
