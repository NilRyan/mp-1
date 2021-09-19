import {
  Accounting,
  AttributesA,
  AttributesB,
  Item,
  ItemDictionary,
  LocDictionary,
  Order,
  Rank,
} from "./DataTypes";
import { Sales } from "./Sales";
import { Transaction } from "./Transaction";
import { averageSatisfaction, countPerItem, countPerLocation, filterByCategoryA, filterByCategoryB, median, sortCallBack } from "./Utilities/Analytics/Utils";

export class Analytics extends Sales {
  constructor(protected _sales: Transaction[]) {
    super(_sales);
  }
  /* Implement these methods in Analytics class */

  /* This function accepts two required parameters.
    //* RANK BASED ON REVENUE
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, items containing an array of items */

  //* Same patterns from transaction were used to create a tuple of items containing quantities
  //* Used GenderEnums for gender, Utilized a funciton filterByCategory to abstract filtering
  rankProductsBy(category: AttributesA, order: Order): Rank {
    const filteredSales: Transaction[] = filterByCategoryA(category, this._sales);
    const itemQuantity: ItemDictionary = countPerItem(filteredSales);

    return { items: Object.entries(itemQuantity).sort(sortCallBack(order)) };
  }

  /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    //* RANK BASED ON AVG SATISFACTION
    Under this category, the products would be ranked based on a given order using satisfaction rate average.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>] */
  // TODONE -> might need to refactor filtering of sales because there is a lot of copy paste 
  //** Used a filterByCategory function to abstract filtering */
  rankLocationSatisfactionBy(
    category: AttributesA,
    order: Order
  ): Rank {
    const filteredSales: Transaction[] = filterByCategoryA(category, this._sales);
    const locAvgSatisfaction: LocDictionary = averageSatisfaction(filteredSales);
    return {
      locations: Object.entries(locAvgSatisfaction).sort(sortCallBack(order)),
    };
  }

  /* This function accepts two required parameters and an optional one.
    The acct specifies either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE
    For Accounting.QUANTITY, the locations will be ranked based on the total quantity being sold regardless of which items.
    For Accounting.REVENUE, the locations will be ranked based on the revenue as computed by the sum of the products of price and quantity for each item.
    For Accounting.PRICE, the locations will be ranked based on the highest/lowest price of the given sold product as specified by the order.
    !item param is only for price?
    !undefined needs to be handled
    //* ORDER.ASC - use lowest price level 
    //* ORDER.DESC - use highest price level
    The order would be determine by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>]*/
  rankLocationBy(
    acct: Accounting,
    order: Order,
    item?: Item
  ): Rank | undefined {
    const locQuantity: LocDictionary = countPerLocation(acct, order, this._sales, item);
    return {
      locations: Object.entries(locQuantity).sort(sortCallBack(order)),
    };
  }

  /* This function accepts one required parameter.
    It computes the median of the age with respect to the Item, Location, PurchaseMethod or Gender
    For example, medianAge('notepad') will return the median age of the customers who bought a notepad
    Another example, medianAge('Denver') will return the median age of the customers who bought in Denver branch */
  medianAge(category: AttributesB): number | undefined {
    const filteredTransaction: Transaction[] = filterByCategoryB(category, this._sales);
    return median(filteredTransaction.map(({customer}) => customer.age));
  }

}
