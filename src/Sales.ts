import { Accounting, AttributesA, AttributesB, Item, Level, Order, Rank, Location, Period, Month, Day } from "./DataTypes";
import { Requirements } from "./Requirements";
import { Transaction } from "./Transaction";

export abstract class Sales implements Requirements {
  constructor(protected _sales: Transaction[]) {}

  add(transaction: Transaction): void {
    this._sales.push(transaction);
  }
  listLocations() {
    return [...new Set(this._sales.map((transaction) => transaction.location))].sort();
  }
  listTags() {
    const listOfTags = [
      ...new Set(
        this._sales.map((transaction) =>
          transaction.products
            .map((product) => {
              return product.tags;
            })
            
        ).flat(2)
      ),
    ].sort();
    return listOfTags;
  }
  listItems() {
    return [...new Set(this._sales.map((transaction) => transaction.listItems()).flat())].sort();
  }
  listPurchaseMethods() {
    return [...new Set(this._sales.map((transaction) => transaction.purchaseMethod))].sort();
  }
  // TODO functions
/* This function accepts three required parameters. 
    Depending on the level which is either Level.HIGHEST OR LEVEL.LOWEST, 
    it parses the data to get the highest/lowest price of an item in a given location */
  getPrice(location: Location, item: Item, level: Level): number{
    let prices: number[] = [];
    this._sales
      .filter((transaction) => transaction.location === location)
      .forEach((transaction) => {
        const items = transaction.perItem(Accounting.PRICE);
        if (items.hasOwnProperty(item)) {
          prices.push(items[item]);
        }
      });
    
    return level === Level.HIGHEST ? Math.max(...prices) : Math.min(...prices);
  }
/* This function accepts one required and one optional parameters.
  It computes the total sales of a given period, optionally in a given location or in all locations.
  For the Period.YEARLY, it should output a sorted array of tuples containing years and the corresponding total amount(e.g. [[2001,123456],[2002,123456],[2003,123456]])
  For the Period.MONTHLY, it should output a sorted array of tuples containing months and the corresponding total amount(e.g. [['Jan',123456],['Feb',123456],['Mar',123456]])
  For the Period.WEEKLY, it should output a sorted array of tuples containing days of week and the corresponding total amount(e.g. [['Mon','123456'],['Tue',123456],['Wed',123456]]) 
  For the Period.ALL, it should output the total amount
  The order should be chronological: ascending years, Jan-Dec or Sun-Sat
  The location parameter filters the data for the corresponding location. If unspecified, all branches would be considered.*/
  getSalesFor(period: Period, location?: Location): Rank {
    let salesFor: Rank = {};

    if (period === Period.YEARLY) {
      const year = this._sales.map((transaction) => [transaction.getYear(), transaction.total(Accounting.REVENUE)] as [number, number]);
      salesFor["yearlySales"] = year;
      return salesFor;
    }

    if (period === Period.MONTHLY) {
      const month = this._sales.map((transaction) => [transaction.getMonth(), transaction.total(Accounting.REVENUE)] as [Month, number]);
      salesFor["monthlySales"] = month;
      return salesFor;
    }

    if (period === Period.WEEKLY) {
      const week = this._sales.map((transaction) => [transaction.getDay(), transaction.total(Accounting.REVENUE)] as [Day, number]);
      salesFor["weeklySales"] = week;
      return salesFor;
    }

    if (period === Period.ALL) {
      salesFor["all"] = this._sales.map((transaction) => transaction.total(Accounting.REVENUE)).reduce((a, b) => a + b);
      return salesFor;
    }
  } // YEARLY = {'yearlySales':[[number, number]]}


/* This function accepts two required parameters.
    Depending on the level which is either Level.HIGHEST OR Level.LOWEST, it computes the highest/lowest revenue with respect to the period.
    Period can be yearly, monthly or day of the week
    e.g. getSales(Period.Yearly, Level.HIGHEST) will return the year with the highest sales in a tuple form.
    e.g. getSales(Period.Weekly, Level.LOWEST) will return the day of the week with the lowest sales in a tuple form.
    string for month */
  getSales(period: Period, level: Level): [Month | Day | number | 'All', number] {
    if (period === Period.YEARLY) {
      let sale = this.getSalesFor(period);
      
      };
    

    if (period === Period.WEEKLY) {

    }
    return 
  } // years, month(Jan-Dec), day(Sun-Sat)


  /* This function accepts two required and one optional parameters.
      It computes the total sales between the two dates, from and two in a given location.
      If the location is not specified, it will consider all the branches.
      The returned value should be a tuple of Date, Date and the total amount in number */
  getSalesBetween(from: Date, to: Date, location?: Location): [Date, Date, number] {
    return
  }



  abstract rankProductsBy(category: AttributesA, order: Order): Rank;
  abstract rankLocationSatisfactionBy(category: AttributesA, order: Order): Rank | undefined;
  abstract rankLocationBy(acct: Accounting, order: Order, item?: Item): Rank | undefined;
  abstract medianAge(category: AttributesB): number | undefined;
}
