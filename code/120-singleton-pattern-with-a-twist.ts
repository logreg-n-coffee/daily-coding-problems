/* 
Implement the singleton pattern with a twist. First, instead of storing one instance, store two instances.

And in every even call of getInstance(), 
return the first instance and in every odd call of getInstance(), return the second instance.

https://en.wikipedia.org/wiki/Singleton_pattern
 */


class SingletonTwist {
    private static instance1: SingletonTwist | null = null;
    private static instance2: SingletonTwist | null = null;
    private static count: number = 0;

    private constructor() { 
        // Private constructor suppresses default public constructor 
        // Disallow creation through the constructor
    }
    
    public static getInstance(): SingletonTwist {
        if (!SingletonTwist.instance1) {
            SingletonTwist.instance1 = new SingletonTwist();
            console.log('SingletonTwist instance 1 running.');
            return SingletonTwist.instance1;
        } else if (!SingletonTwist.instance2) { 
            SingletonTwist.instance2 = new SingletonTwist();
            console.log('SingletonTwist instance 2 running.');
            return SingletonTwist.instance2;
        } else {
            // if we created instance1 and instance2 already
            SingletonTwist.count++;
            if (SingletonTwist.count % 2 === 1) {
                console.log('Already created instance, returning instance 1.');
                return SingletonTwist.instance1;
            } else {
                console.log('Already created instance, returning instance 2.');
                return SingletonTwist.instance2;
            }
        }
    }
}

(() => { 
    SingletonTwist.getInstance();
    SingletonTwist.getInstance();
    SingletonTwist.getInstance();
    SingletonTwist.getInstance();
    SingletonTwist.getInstance();
})();
