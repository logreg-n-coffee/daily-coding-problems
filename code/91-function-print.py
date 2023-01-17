'''
What does the below code snippet print out? 
How can we fix the anonymous functions to behave as we'd expect?
'''

def undesired(): 
    functions = []

    for i in range(10):
        functions.append(lambda : i)

    for f in functions:
        print(f())

undesired()
    
'''
In Python, no new scope will be produced in for loop.

So after for i in range(10), the variable i is still exist, 
and its value == 9. And the lambda function lambda : i access the variable i

In order to output the desired result, 
we should pass the variable as a function argument in loop
'''

def desired(): 
    functions = []

    for i in range(10):
        functions.append(lambda i = i: i)

    for f in functions:
        print(f())

desired()