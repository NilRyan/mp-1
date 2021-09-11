"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
const DataTypes_1 = require("./DataTypes");
const Sales_1 = require("./Sales");
class Analytics extends Sales_1.Sales {
    _sales;
    constructor(_sales) {
        super(_sales);
        this._sales = _sales;
    }
    /* Implement these methods in Analytics class */
    /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, items containing an array of items */
    //* Same patterns from transaction were used to create a tuple of items containing quantities
    //* Used GenderEnums for gender, Utilized a funciton filterByCategory to abstract filtering
    rankProductsBy(category, order) {
        let filteredSales = this.filterByCategory(category);
        let perItem;
        let itemQuantity = {};
        perItem = filteredSales.map((transaction) => {
            return Object.entries(transaction.perItem(DataTypes_1.Accounting.QUANTITY));
        }).flat();
        perItem.forEach((item) => {
            if (itemQuantity.hasOwnProperty(item[0])) {
                itemQuantity[item[0]] += item[1];
            }
            else {
                itemQuantity[item[0]] = item[1];
            }
        });
        const sortCallBack = DataTypes_1.Order.ASC === order ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1];
        return { items: Object.entries(itemQuantity).sort(sortCallBack) };
    }
    /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>] */
    // TODO -> might need to refactor filtering of sales because there is a lot of copy paste
    //** Used a filterByCategory function to abstract filtering */
    rankLocationSatisfactionBy(category, order) {
        let filteredSales = this.filterByCategory(category);
        let locQuantity = {};
        filteredSales.forEach((transaction) => {
            if (locQuantity.hasOwnProperty(transaction.location)) {
                locQuantity[transaction.location] += 1;
            }
            else {
                locQuantity[transaction.location] = 1;
            }
        });
        console.log(locQuantity);
        const sortCallBack = DataTypes_1.Order.ASC === order ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1];
        return { locations: Object.entries(locQuantity).sort(sortCallBack) };
    }
    /* This function accepts two required parameters and an optional one.
    The acct specifies either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE
    For Accounting.QUANTITY, the locations will be ranked based on the total quantity being sold regardless of which items.
    For Accounting.REVENUE, the locations will be ranked based on the revenue as computed by the sum of the products of price and quantity for each item.
    For Accounting.PRICE, the locations will be ranked based on the highest/lowest price of the given sold product as specified by the order.
    The order would be determine by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>]*/
    rankLocationBy(acct, order, item) {
        let locQuantity = {};
        if (acct === DataTypes_1.Accounting.QUANTITY) {
            this._sales.map((transaction) => [transaction.location, transaction.total(acct)]).forEach((loc) => {
                if (locQuantity.hasOwnProperty(loc[0])) {
                    locQuantity[loc[0]] += Number(loc[1]);
                }
                else {
                    locQuantity[loc[0]] = Number(loc[1]);
                }
            });
        }
        if (acct === DataTypes_1.Accounting.REVENUE) {
            this._sales.map((transaction) => [transaction.location, transaction.total(acct)]).forEach((loc) => {
                if (locQuantity.hasOwnProperty(loc[0])) {
                    locQuantity[loc[0]] += Number(loc[1]);
                }
                else {
                    locQuantity[loc[0]] = Number(loc[1]);
                }
            });
        }
        if (acct === DataTypes_1.Accounting.PRICE) {
            this._sales.map((transaction) => [transaction.location, transaction.total(acct)]).forEach((loc) => {
                if (locQuantity.hasOwnProperty(loc[0])) {
                    locQuantity[loc[0]] += Number(loc[1]);
                }
                else {
                    locQuantity[loc[0]] = Number(loc[1]);
                }
            });
        }
        const sortCallBack = DataTypes_1.Order.ASC === order ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1];
        return { locations: Object.entries(locQuantity).sort(sortCallBack) };
    }
    /* This function accepts one required parameter.
    It computes the median of the age with respect to the Item, Location, PurchaseMethod or Gender
    For example, medianAge('notepad') will return the median age of the customers who bought a notepad
    Another example, medianAge('Denver') will return the median age of the customers who bought in Denver branch */
    medianAge(category) {
        return;
    }
    filterByCategory(category) {
        let filteredSales;
        if (category === DataTypes_1.GenderEnum.M) {
            filteredSales = this._sales.filter((transaction) => transaction.customer.gender === DataTypes_1.GenderEnum.M);
        }
        if (category === DataTypes_1.GenderEnum.F) {
            filteredSales = this._sales.filter((transaction) => transaction.customer.gender === DataTypes_1.GenderEnum.F);
        }
        if (typeof category === "boolean") {
            filteredSales = category ? this._sales.filter((transaction) => transaction.coupon === true) : this._sales.filter((transaction) => transaction.coupon === false);
        }
        if (typeof category === "number") {
            filteredSales = this._sales.filter((transaction) => transaction.customer.age === category);
        }
        return filteredSales;
    }
}
exports.Analytics = Analytics;
