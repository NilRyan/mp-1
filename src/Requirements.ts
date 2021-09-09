import { Transaction } from './Transaction';
import {
  AttributesA, AttributesB, Rank,
  Order, Accounting, Location,
  Item, Tag, PurchaseMethod,
  Period, Month, Day, Level
} from './DataTypes';


export interface Requirements{
    /* Implement these methods in the class Sales */
    /* This function accept a Transaction object and inserts it in a private array of _sales */
    add(transaction: Transaction): void
    
    /* This function returns an array of locations in alphabetical order; no redundant */
    listLocations(): Location[]

    /* This function returns an array of tags in alphabetical order; no redundant */
    listTags(): Tag[]

    /* This function returns an array of items in alphabetical order; no redundant */
    listItems(): Item[]

    /* This function returns an array of purchase methods in alphabetical order; no redundant */
    listPurchaseMethods(): PurchaseMethod[]

    /* This function accepts three required parameters. 
        Depending on the level which is either Level.HIGHEST OR LEVEL.LOWEST, 
        it parses the data to get the highest/lowest price of an item in a given location */
    getPrice(location: Location, item: Item, level: Level): number
    

    /* This function accepts one required and one optional parameters.
        It computes the total sales of a given period, optionally in a given location or in all locations.
        For the Period.YEARLY, it should output a sorted array of tuples containing years and the corresponding total amount(e.g. [[2001,123456],[2002,123456],[2003,123456]])
        For the Period.MONTHLY, it should output a sorted array of tuples containing months and the corresponding total amount(e.g. [['Jan',123456],['Feb',123456],['Mar',123456]])
        For the Period.WEEKLY, it should output a sorted array of tuples containing days of week and the corresponding total amount(e.g. [['Mon','123456'],['Tue',123456],['Wed',123456]]) 
        For the Period.ALL, it should output the total amount
        The order should be chronological: ascending years, Jan-Dec or Sun-Sat
        The location parameter filters the data for the corresponding location. If unspecified, all branches would be considered.*/
    getSalesFor(period: Period, location?:Location): Rank
    // YEARLY = {'yearlySales':[[number, number]]}

    /* This function accepts two required parameters.
        Depending on the level which is either Level.HIGHEST OR Level.LOWEST, it computes the highest/lowest revenue with respect to the period.
        Period can be yearly, monthly or day of the week
        e.g. getSales(Period.Yearly, Level.HIGHEST) will return the year with the highest sales in a tuple form.
        e.g. getSales(Period.Weekly, Level.LOWEST) will return the day of the week with the lowest sales in a tuple form.
        string for month */
    getSales(period: Period, level: Level): [Month|Day|number|'All',number] //
    // years, month(Jan-Dec), day(Sun-Sat)

  

    /* This function accepts two required and one optional parameters.
        It computes the total sales between the two dates, from and two in a given location.
        If the location is not specified, it will consider all the branches.
        The returned value should be a tuple of Date, Date and the total amount in number */
    getSalesBetween(from: Date, to: Date, location?:Location): [Date,Date,number]


    /* Implement these methods in Analytics class */

    /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, items containing an array of items */
    rankProductsBy(category: AttributesA, order: Order): Rank

    /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>] */
    rankLocationSatisfactionBy(category: AttributesA, order: Order): Rank|undefined

    /* This function accepts two required parameters and an optional one.
    The acct specifies either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE
    For Accounting.QUANTITY, the locations will be ranked based on the total quantity being sold regardless of which items.
    For Accounting.REVENUE, the locations will be ranked based on the revenue as computed by the sum of the products of price and quantity for each item.
    For Accounting.PRICE, the locations will be ranked based on the highest/lowest price of the given sold product as specified by the order.
    The order would be determine by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>]*/
    rankLocationBy(acct: Accounting, order: Order, item?: Item): Rank|undefined

    /* This function accepts one required parameter.
    It computes the median of the age with respect to the Item, Location, PurchaseMethod or Gender
    For example, medianAge('notepad') will return the median age of the customers who bought a notepad
    Another example, medianAge('Denver') will return the median age of the customers who bought in Denver branch */
    medianAge(category: AttributesB): number|undefined
    

}