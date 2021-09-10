import { Accounting, AttributesA, AttributesB, GenderEnum, Item, ItemDictionary, Order, Rank } from "./DataTypes";
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
  
  //* Same patterns from transaction were used to create a tuple of items containing quantities
  //* Used GenderEnums for gender
  rankProductsBy(category: AttributesA, order: Order): Rank {
    let filteredSales: Transaction[];
    let perItem: [Item, number][];
    let itemQuantity: ItemDictionary = {};
    if (category === GenderEnum.M) {
       filteredSales = this._sales.filter((transaction) => transaction.customer.gender === GenderEnum.M);
    }
    if (category === GenderEnum.F) {
       filteredSales = this._sales.filter((transaction) => transaction.customer.gender === GenderEnum.F);
    }
    if (typeof category === "boolean") {
       filteredSales = category ? this._sales.filter((transaction) => transaction.coupon === true) : this._sales.filter((transaction) => transaction.coupon === false);
    }
    if (typeof category === "number") {
      filteredSales = this._sales.filter((transaction) => transaction.customer.age === category);
   
    }
    perItem = filteredSales.map((transaction) => {
      return Object.entries(transaction.perItem(Accounting.QUANTITY));
    }).flat() as [Item, number][];
    perItem.forEach((item) => {
      if (itemQuantity.hasOwnProperty(item[0])) {
        itemQuantity[item[0]] += item[1];
      } else {
        itemQuantity[item[0]] = item[1];
      }
    })
    const sortCallBack = Order.ASC === order ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1];
    return { items: Object.entries(itemQuantity).sort(sortCallBack) };
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