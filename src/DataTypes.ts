// Create a string literal type, Gender that contains all the possible values as can be observed in the data
// Create a string literal type, Item that contains all the possible products as can be observed in the data
// Create a string literal type, Tag that contains all the possible tags of an product as can be observed in the data
// Create a string literal type, Location that contains all the locations as can be observed in the data
// Create a string literal type, PurchaseMethod that contains all the methods of buying as can be observed in the data
// Create a string literal type, Month that contains all the months in this format: 'Jan', 'Feb', 'Mar', etc.
// Create a string literal type, Day that contains all the days of the week in this format: 'Mon', 'Tue', 'Wed', etc.
// Create a type alias, AttributesA which is the union type of Gender, number and boolean
// Create a type alias, AttributesB which is the union types of Item, Location, PurchaseMethod and Gender
// Create a type alias, ItemDictionary which is an object whose optional keys are the string literal types of Item and their corresponding values are of number type
// Create a type alias, TagDictionary which is an object whose optional keys are the string literal types of Tag and their corresponding values are of number type
// Create a type alias, LocDictionary which is an object whose optional keys are the string literal types of Location and their corresponding values are of number type
// Create a type alias, SalesPeriod which is the union type of Month, Day, number and 'All'
export type Gender = 'M' | 'F';
export type Item = 'printer paper' | 'envelopes' | 'notepad' | 'backpack' | 'pens' | 'binder' | 'laptop';
export type Tag = 'office' | 'stationary' | 'writing' | 'school' | 'travel' | 'kids' | 'general' | 'organization' | 'electronics';

/* Write an interface, Rank which has the following optional properties:
1. locations - array of tuples of string and number
2. items - array of tuples of string and number
3. tags - array of tuples of string and number
4. yearlySales - array of tuples of number and number
5. monthlySales - array of tuples of Month and number
6. weeklySales - array of tuples of Day and number
7. all - a number */

/* Create an enum Order that has the following elements: 
ASC for smallest to highest order
DESC for highest to smallest order */
  
/* Create an enum Accounting that has the following elements: 
QUANTITY for the quantity bought
REVENUE for the product of quantity bought and the unit price
PRICE for the unit price of an item */

/* Create an enum Period that has the following elements: 
YEARLY for the annual data
MONTHLY for the monthly data
WEEKLY for the day of the week
ALL for all the avaibale data*/

/* Create an enum Level that has the following elements: 
HIGHEST and LOWEST*/
