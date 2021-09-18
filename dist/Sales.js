"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const DataTypes_1 = require("./DataTypes");
const Utils_1 = require("./Utilities/Sales/Utils");
class Sales {
    _sales;
    constructor(_sales) {
        this._sales = _sales;
    }
    add(transaction) {
        this._sales.push(transaction);
    }
    listLocations() {
        return [...new Set(this._sales.map((transaction) => transaction.location))].sort();
    }
    listTags() {
        const listOfTags = [
            ...new Set(this._sales.map((transaction) => transaction.products
                .map((product) => {
                return product.tags;
            })).flat(2)),
        ].sort();
        return listOfTags;
    }
    listItems() {
        return [...new Set(this._sales.map((transaction) => transaction.listItems()).flat())].sort();
    }
    listPurchaseMethods() {
        return [...new Set(this._sales.map((transaction) => transaction.purchaseMethod))].sort();
    }
    /* This function accepts three required parameters.
    Depending on the level which is either Level.HIGHEST OR LEVEL.LOWEST,
    it parses the data to get the highest/lowest price of an item in a given location */
    //* Used nested forEach to determine the max or minimum price
    getPrice(location, item, level) {
        const prices = [];
        this._sales
            .forEach((transaction) => {
            if (transaction.location === location) {
                transaction.products.forEach((product) => {
                    if (product.item === item) {
                        prices.push(product.price);
                    }
                });
            }
        });
        return level === DataTypes_1.Level.HIGHEST ? Math.max(...prices) : Math.min(...prices);
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
    getSalesFor(period, location) {
        const salesFor = {};
        const sales = location ? this._sales.filter((transaction) => transaction.location === location) : this._sales;
        if (period === DataTypes_1.Period.YEARLY) {
            const year = sales.map((transaction) => [transaction.getYear(), transaction.total(DataTypes_1.Accounting.REVENUE)]).sort();
            const yearlySales = (0, Utils_1.periodSales)(year);
            salesFor["yearlySales"] = yearlySales;
            return salesFor;
        }
        if (period === DataTypes_1.Period.MONTHLY) {
            const month = sales.map((transaction) => [transaction.getMonth(), transaction.total(DataTypes_1.Accounting.REVENUE)]);
            const monthlySales = (0, Utils_1.periodSales)(month);
            const monthLookUp = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            salesFor["monthlySales"] = monthLookUp.map((month) => {
                return [month, monthlySales.find((m) => m[0] === month)[1]];
            });
            return salesFor;
        }
        if (period === DataTypes_1.Period.WEEKLY) {
            const week = sales.map((transaction) => [transaction.getDay(), transaction.total(DataTypes_1.Accounting.REVENUE)]);
            const weeklySales = (0, Utils_1.periodSales)(week);
            const weekLookUp = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            salesFor["weeklySales"] = weekLookUp.map((week) => {
                return [week, weeklySales.find((m) => m[0] === week)[1]];
            });
            return salesFor;
        }
        if (period === DataTypes_1.Period.ALL) {
            salesFor["all"] = sales.map((transaction) => {
                return transaction.total(DataTypes_1.Accounting.REVENUE);
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
    getSales(period, level) {
        let sale;
        if (period === DataTypes_1.Period.YEARLY) {
            sale = this.getSalesFor(period).yearlySales;
        }
        if (period === DataTypes_1.Period.MONTHLY) {
            sale = this.getSalesFor(period).monthlySales;
        }
        if (period === DataTypes_1.Period.WEEKLY) {
            sale = this.getSalesFor(period).weeklySales;
        }
        return level === DataTypes_1.Level.HIGHEST ? sale.sort((a, b) => b[1] - a[1])[0] : sale.sort((a, b) => a[1] - b[1])[0];
    } // years, month(Jan-Dec), day(Sun-Sat)
    /* This function accepts two required and one optional parameters.
        It computes the total sales between the two dates, from and two in a given location.
        If the location is not specified, it will consider all the branches.
        The returned value should be a tuple of Date, Date and the total amount in number */
    //* Use Date.getTime() method to compare numerical values of dates,
    getSalesBetween(from, to, location) {
        const salesInLocation = location ? this._sales.filter((transaction) => transaction.location === location) : this._sales;
        const salesBetween = salesInLocation.filter((transaction) => {
            const date = new Date(transaction.saleDate).getTime();
            if (date >= from.getTime() && date < to.getTime()) {
                return true;
            }
            return false;
        }).map((transaction) => transaction.total(DataTypes_1.Accounting.REVENUE)).reduce((a, b) => a + b, 0);
        return [from, to, salesBetween];
    }
}
exports.Sales = Sales;
