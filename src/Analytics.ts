import {
  Accounting,
  AttributesA,
  AttributesB,
  Gender,
  GenderEnum,
  Genders,
  isType,
  Item,
  ItemDictionary,
  Items,
  Level,
  Location,
  Locations,
  LocDictionary,
  Order,
  PurchaseMethod,
  PurchaseMethods,
  Rank,
} from "./DataTypes";
import { Sales } from "./Sales";
import { Transaction } from "./Transaction";

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
    const filteredSales: Transaction[] = this.filterByCategory(category);
    const itemQuantity: ItemDictionary = {};
    const perItem: [Item, number][] = filteredSales
      .map((transaction) => {
        return Object.entries(transaction.perItem(Accounting.QUANTITY));
      })
      .flat() as [Item, number][];
    perItem.forEach((item) => {
      if (itemQuantity[item[0]] !== undefined) {
        itemQuantity[item[0]] += item[1];
      } else {
        itemQuantity[item[0]] = item[1];
      }
    });
    return { items: Object.entries(itemQuantity).sort(this.sortCallBack(order)) };
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
    const filteredSales = this.filterByCategory(category);
    const locTotalSatisfaction: LocDictionary = {};
    const locCustomerCount: LocDictionary = {};
    const locAvgSatisfaction: LocDictionary = {};
    filteredSales.forEach((transaction) => {
      if (locTotalSatisfaction[transaction.location] !== undefined) {
        locTotalSatisfaction[transaction.location] += transaction.satisfaction;
        locCustomerCount[transaction.location] += 1;
      } else {
        locTotalSatisfaction[transaction.location] = transaction.satisfaction;
        locCustomerCount[transaction.location] = 1;
      }
    });
    for (const location in locTotalSatisfaction) {
      locAvgSatisfaction[location] = locTotalSatisfaction[location] / locCustomerCount[location];
    }

    return {
      locations: Object.entries(locAvgSatisfaction).sort(this.sortCallBack(order)),
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
    const locQuantity: LocDictionary = {};
    const level = order === Order.ASC ? Level.LOWEST : Level.HIGHEST;
    if (acct === Accounting.QUANTITY || acct === Accounting.REVENUE) {
      this._sales
        .map((transaction) => [transaction.location, transaction.total(acct)])
        .forEach((loc) => {
          if (locQuantity[loc[0]] !== undefined) {
            locQuantity[loc[0]] += Number(loc[1]);
          } else {
            locQuantity[loc[0]] = Number(loc[1]);
          }
        });
    }

    if (acct === Accounting.PRICE) {
      this._sales
        .map((transaction) => {
          const price = transaction.perItem(acct)[item]
            ? transaction.perItem(acct)[item]
            : 0;
          return [transaction.location, price];
        })
        .forEach((loc) => {
          if (locQuantity[loc[0]] !== undefined) {
            if (level === Level.HIGHEST) {
              locQuantity[loc[0]] = locQuantity[loc[0]] < Number(loc[1]) ? loc[1] : locQuantity[loc[0]];
            }
            if (level === Level.LOWEST) {
              locQuantity[loc[0]] = locQuantity[loc[0]] < Number(loc[1]) ? locQuantity[loc[0]] : loc[1] ;
            }
          } else {
            locQuantity[loc[0]] = Number(loc[1]);
          }
        });
    }

    return {
      locations: Object.entries(locQuantity).sort(this.sortCallBack(order)),
    };
  }

  /* This function accepts one required parameter.
    It computes the median of the age with respect to the Item, Location, PurchaseMethod or Gender
    For example, medianAge('notepad') will return the median age of the customers who bought a notepad
    Another example, medianAge('Denver') will return the median age of the customers who bought in Denver branch */
  medianAge(category: AttributesB): number | undefined {
    let ages: Transaction[] = [];
    if (isType<AttributesB>(category, Items)) {
      ages = this._sales
        .filter((transaction) => transaction.listItems().includes(category as Item))   
    }
    if (isType<AttributesB>(category, Locations)) {
      ages = this._sales
        .filter((transaction) => transaction.location === category as Location)
    }
    if (isType<AttributesB>(category, PurchaseMethods)) {
      ages = this._sales
        .filter((transaction) => transaction.purchaseMethod === category as PurchaseMethod)
    }
    if (isType<AttributesB>(category, Genders)) {
      if (category === 'M') {
        ages = this._sales
          .filter((transaction) => transaction.customer.gender === 'M' as Gender)
      }
      if (category === 'F') {
        ages = this._sales
          .filter((transaction) => transaction.customer.gender === 'F' as Gender)
      }
    }
    return this.median(ages.map((transaction) => transaction.customer.age));
  }

  median(numbers: number[]): number {
    let median = 0;
    const numsLen = numbers.length;
    numbers.sort();

    numsLen % 2 === 0
      ? (median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2)
      : (median = numbers[(numsLen - 1) / 2]);
    return median;
  }

  filterByCategory(category: AttributesA): Transaction[] {
    let filteredSales: Transaction[];
    if (category === GenderEnum.M) {
      filteredSales = this._sales.filter(
        (transaction) => transaction.customer.gender === GenderEnum.M
      );
    }
    if (category === GenderEnum.F) {
      filteredSales = this._sales.filter(
        (transaction) => transaction.customer.gender === GenderEnum.F
      );
    }
    if (typeof category === "boolean") {
      filteredSales = category
        ? this._sales.filter((transaction) => transaction.coupon === true)
        : this._sales.filter((transaction) => transaction.coupon === false);
    }
    if (typeof category === "number") {
      filteredSales = this._sales.filter(
        (transaction) => transaction.customer.age === category
      );
    }
    return filteredSales;
  }
  sortCallBack(order: Order) {
    return Order.ASC === order ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1];
  }
}
