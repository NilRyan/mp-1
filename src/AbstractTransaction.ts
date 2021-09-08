import {Product} from './Product'
import {Customer} from './Customer'
import {Location, PurchaseMethod, Accounting, 
    ItemDictionary, Level, Item, Day, Month, TagDictionary} from './DataTypes'


export abstract class AbstractTransaction{
    constructor(protected _customer: Customer, protected _products: Product[], protected _location:Location, protected _saleDate: Date, 
        protected _satisfaction: number, protected _coupon: boolean, protected _purchaseMethod: PurchaseMethod){
 
    }

    // This function is a getter for the products
    abstract get products(): Product[]
    // This function is a getter for the location
    abstract get location(): Location
    // This function is a getter for the saleDate
    abstract get saleDate(): Date
    // This function is a getter for the customer
    abstract get customer(): Customer
    // This function is a getter for the coupon
    abstract get coupon(): boolean
    // This function is a getter for the purchaseMethod
    abstract get purchaseMethod(): PurchaseMethod
    // This function is a getter for the satisfaction
    abstract get satisfaction(): number

    /* This function returns an array of items being sold in this transaction in an alphabetical order*/
    abstract listItems(): Item[]

    /* This function accepts one required parameter(either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE) and an optional one(Level.HIGHEST or Level.LOWEST).
    For Accounting.QUANTITY, it will collect all the quantity per item.
    For Accounting.REVENUE, it will collect all the revenue(price * quantity) per item.
    For Accounting.PRICE, it will collect all the price per item.
    e.g. {'notepad':123,'laptop':345} */
    abstract perItem(acct: Accounting, level?: Level): ItemDictionary

     /* This function computes the total amount of the transaction with respect to the parameter acct, by adding all the values of the perItem.*/
    abstract total(acct: Accounting, level?: Level): number
    

    /* This function accepts one required parameter(either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE) and an optional one(Level.HIGHEST or Level.LOWEST)
    It computes the values for all the tags existing in this transaction.
    Here's how to compute the value of a tag for each transaction:
    For Accounting.QUANTITY, it will sum up all the quantities of the sold items containing the tag.
    For Accounting.REVENUE, it will sum up only the revenues (price times quantity) of the sold items containing the tag
    For Accounting.PRICE, it will get the highest/lowest price of the item containing the tag depending on the optional level. 
    */ 
    abstract perTag(acct: Accounting, level?: Level): TagDictionary
   
    // This function gets the day of the week given of the date(e.g. 'Mon', 'Tue', etc.)
    abstract getDay(): Day

    // This function gets the year of the given date(e.g. 2020, 2021, etc.)
    abstract getYear(): number

    // This function gets the month of the given date(e.g. 'Jan', 'Feb', 'Mar' etc.)
    abstract getMonth(): Month
    
}

// Create a class Transaction which extends this class and implements the abstract functions
