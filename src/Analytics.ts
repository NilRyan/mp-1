import { Accounting, AttributesA, AttributesB, Item, Order, Rank } from "./DataTypes";
import { Sales } from "./Sales";
import { Transaction } from "./Transaction";

export class Analytics extends Sales {
  constructor( protected _sales: Transaction[]) {
    super(_sales);
  }
  /* Implement these methods in Analytics class */

    /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, items containing an array of items */
  rankProductsBy(category: AttributesA, order: Order): Rank {
      return
    }

    /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>] */
  rankLocationSatisfactionBy(category: AttributesA, order: Order): Rank | undefined {
      return
    }

    /* This function accepts two required parameters and an optional one.
    The acct specifies either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE
    For Accounting.QUANTITY, the locations will be ranked based on the total quantity being sold regardless of which items.
    For Accounting.REVENUE, the locations will be ranked based on the revenue as computed by the sum of the products of price and quantity for each item.
    For Accounting.PRICE, the locations will be ranked based on the highest/lowest price of the given sold product as specified by the order.
    The order would be determine by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>]*/
  rankLocationBy(acct: Accounting, order: Order, item?: Item): Rank | undefined {
      return
    }

    /* This function accepts one required parameter.
    It computes the median of the age with respect to the Item, Location, PurchaseMethod or Gender
    For example, medianAge('notepad') will return the median age of the customers who bought a notepad
    Another example, medianAge('Denver') will return the median age of the customers who bought in Denver branch */
  medianAge(category: AttributesB): number | undefined {
      return
    }
}