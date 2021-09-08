1. This is an incomplete source code that you need to complete by filling in what is being asked.
2. Some classes are missing and you need to create them. 
    2.a. Create a class, 
        Customer which has three private properties: _gender:Gender, _age:number and _email:string.
        
         Add a constructor that accepts the three properties. Add their corresponding getters.
    2.b. Create a class, 
        Product which has three private properties: _item:Item, _price:number and _tags:Tag[]. 
        
        Add a constructor that accepts the values for item and price properties. Add their corresponding getters. Add a setter for tags.
    2.c. Create a class, 
        Transaction which extends AbstractTransaction and implements its abstract methods. 
        
        Add a constructor similar to its superclass.
    2.c. Create a class, 
        Sales which implements the Requirements and some of its abstract methods. 
        
        Add the protected property '_sales' which is of type Transaction[]. Add a constructor with one parameter, sales: Transaction[]

    Please note that not all methods need to be implemented inside this class as specified by the Requirements

    2.d. Create a class Analytics 
        which extends the Sales class and implements its abstract methods. 
        Add a constructor similar to that of Sales class.
3. Create the type aliases, 
    literal types and enums being asked in the file, DataTypes.ts.
    
    You need to explore first the data to know all the possible literal types.
4. Use the index.ts to run your code. 
    Note that when instantiation, 
    you will be using the interface Requirements for an object of the class Analytics(i.e. let a: Requirements = new Analytics([]))