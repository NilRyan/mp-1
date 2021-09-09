"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
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
    rankProductsBy(category, order) {
        return;
    }
    /* This function accepts two required parameters.
    The category specifies either gender, age or coupon
    Under this category, the products would be ranked based on a given order.
    This order would be specified by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>] */
    rankLocationSatisfactionBy(category, order) {
        return;
    }
    /* This function accepts two required parameters and an optional one.
    The acct specifies either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE
    For Accounting.QUANTITY, the locations will be ranked based on the total quantity being sold regardless of which items.
    For Accounting.REVENUE, the locations will be ranked based on the revenue as computed by the sum of the products of price and quantity for each item.
    For Accounting.PRICE, the locations will be ranked based on the highest/lowest price of the given sold product as specified by the order.
    The order would be determine by the second parameter which is either Order.ASC(ascending) or Order.DESC(descending).
    The output should be a Rank obj whose property, locations containing an array of tuples, [<locations>,<number>]*/
    rankLocationBy(acct, order, item) {
        return;
    }
    /* This function accepts one required parameter.
    It computes the median of the age with respect to the Item, Location, PurchaseMethod or Gender
    For example, medianAge('notepad') will return the median age of the customers who bought a notepad
    Another example, medianAge('Denver') will return the median age of the customers who bought in Denver branch */
    medianAge(category) {
        return;
    }
}
exports.Analytics = Analytics;
