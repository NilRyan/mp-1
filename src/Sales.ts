import { Accounting, AttributesA, AttributesB, Item, Level, Order, Rank, Location, Period, Month, Day, Tag, PurchaseMethod } from "./DataTypes";
import { Requirements } from "./Requirements";
import { Transaction } from "./Transaction";
import { periodSales } from "./Utilities/Sales/Utils";

export abstract class Sales implements Requirements {
  constructor(protected _sales: Transaction[]) {}

  add(transaction: Transaction): void {
    this._sales.push(transaction);
  }
  listLocations(): Location[] {
    return [...new Set(this._sales.map((transaction) => transaction.location))].sort();
  }
  listTags(): Tag[] {
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
  listItems(): Item[] {
    return [...new Set(this._sales.map((transaction) => transaction.listItems()).flat())].sort();
  }
  listPurchaseMethods(): PurchaseMethod[] {
    return [...new Set(this._sales.map((transaction) => transaction.purchaseMethod))].sort();
  }
  /* This function accepts three required parameters. 
  Depending on the level which is either Level.HIGHEST OR LEVEL.LOWEST, 
  it parses the data to get the highest/lowest price of an item in a given location */
  //* Used nested forEach to determine the max or minimum price
  getPrice(location: Location, item: Item, level: Level): number{
    const prices: number[] = [];
    this._sales
      .forEach((transaction) => {
        if (transaction.location === location) {
          transaction.products.forEach((product) => {
            if (product.item === item) {
              prices.push(product.price);
            }
          })
        }
    });
    return level === Level.HIGHEST ? Math.max(...prices) : Math.min(...prices);
  }
  // TODO functions
/* This function accepts one required and one optional parameters.
  It computes the total sales of a given period, optionally in a given location or in all locations.
  For the Period.YEARLY, it should output a sorted array of tuples containing years and the corresponding total amount(e.g. [[2001,123456],[2002,123456],[2003,123456]])
  For the Period.MONTHLY, it should output a sorted array of tuples containing months and the corresponding total amount(e.g. [['Jan',123456],['Feb',123456],['Mar',123456]])
  For the Period.WEEKLY, it should output a sorted array of tuples containing days of week and the corresponding total amount(e.g. [['Mon','123456'],['Tue',123456],['Wed',123456]]) 
  For the Period.ALL, it should output the total amount
  The order should be chronological: ascending years, Jan-Dec or Sun-Sat
  The location parameter filters the data for the corresponding location. If unspecified, all branches would be considered.*/
  getSalesFor(period: Period, location?: Location): Rank {
    const salesFor: Rank = {};
    const sales = location ? this._sales.filter((transaction) => transaction.location === location) : this._sales;

    if (period === Period.YEARLY) {
      const year = sales.map((transaction) => [transaction.getYear(), transaction.total(Accounting.REVENUE)] as [number, number]).sort();
      salesFor["yearlySales"] = periodSales(year);
      return salesFor;
    }

    if (period === Period.MONTHLY) {
      const month = sales.map((transaction) => [transaction.getMonth(), transaction.total(Accounting.REVENUE)] as [Month, number]);
      const monthlySales = periodSales(month);
      const monthLookUp = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      salesFor["monthlySales"] = monthLookUp.map((month) => {
        return [month as Month, monthlySales.find((m) => m[0] === month)[1]];
      });
      return salesFor
    }

    if (period === Period.WEEKLY) {
      const week = sales.map((transaction) => [transaction.getDay(), transaction.total(Accounting.REVENUE)] as [Day, number]);
      const weeklySales = periodSales(week);
      const weekLookUp = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      salesFor["weeklySales"] = weekLookUp.map((week) => {
        return [week as Day, weeklySales.find((m) => m[0] === week)[1]];
      });
      return salesFor;
    }

    if (period === Period.ALL) {
      salesFor["all"] = sales.map((transaction) => {
        return transaction.total(Accounting.REVENUE)
      }).reduce((a, b) => a + b);
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
    let sale: [Month | Day | number | 'All', number][];
    if (period === Period.YEARLY) {
      sale = this.getSalesFor(period).yearlySales;
    }
    if (period === Period.MONTHLY) {
      sale = this.getSalesFor(period).monthlySales;
    }
    if (period === Period.WEEKLY) {
      sale = this.getSalesFor(period).weeklySales;
    }
    
    return level === Level.HIGHEST ? sale.sort((a, b) => b[1] - a[1])[0] : sale.sort((a, b) => a[1] - b[1])[0];
  
  } // years, month(Jan-Dec), day(Sun-Sat)


  /* This function accepts two required and one optional parameters.
      It computes the total sales between the two dates, from and two in a given location.
      If the location is not specified, it will consider all the branches.
      The returned value should be a tuple of Date, Date and the total amount in number */
  //* Use Date.getTime() method to compare numerical values of dates,
  getSalesBetween(from: Date, to: Date, location?: Location): [Date, Date, number] {


    const salesInLocation = location ? this._sales.filter((transaction) => transaction.location === location) : this._sales;
    const salesBetween = salesInLocation.filter((transaction) => {
      const date = new Date(transaction.saleDate).getTime();
      if (date >= from.getTime() && date < to.getTime()) {
        return true;
      }
      return false;
    }).map((transaction) => transaction.total(Accounting.REVENUE)).reduce((a, b) => a + b, 0);
    return [from, to, salesBetween];
  }



  abstract rankProductsBy(category: AttributesA, order: Order): Rank;
  abstract rankLocationSatisfactionBy(category: AttributesA, order: Order): Rank | undefined;
  abstract rankLocationBy(acct: Accounting, order: Order, item?: Item): Rank | undefined;
  abstract medianAge(category: AttributesB): number | undefined;
}
