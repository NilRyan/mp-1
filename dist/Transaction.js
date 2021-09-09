"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const AbstractTransaction_1 = require("./AbstractTransaction");
const DataTypes_1 = require("./DataTypes");
class Transaction extends AbstractTransaction_1.AbstractTransaction {
    _customer;
    _products;
    _location;
    _saleDate;
    _satisfaction;
    _coupon;
    _purchaseMethod;
    constructor(_customer, _products, _location, _saleDate, _satisfaction, _coupon, _purchaseMethod) {
        super(_customer, _products, _location, _saleDate, _satisfaction, _coupon, _purchaseMethod);
        this._customer = _customer;
        this._products = _products;
        this._location = _location;
        this._saleDate = _saleDate;
        this._satisfaction = _satisfaction;
        this._coupon = _coupon;
        this._purchaseMethod = _purchaseMethod;
    }
    // This function is a getter for the products
    get products() {
        return this._products;
    }
    ;
    // This function is a getter for the location
    get location() {
        return this._location;
    }
    ;
    // This function is a getter for the saleDate
    get saleDate() {
        return this._saleDate;
    }
    ;
    // This function is a getter for the customer
    get customer() {
        return this._customer;
    }
    ;
    // This function is a getter for the coupon
    get coupon() {
        return this._coupon;
    }
    ;
    // This function is a getter for the purchaseMethod
    get purchaseMethod() {
        return this._purchaseMethod;
    }
    ;
    // This function is a getter for the satisfaction
    get satisfaction() {
        return this._satisfaction;
    }
    ;
    /* This function returns an array of items being sold in this transaction in an alphabetical order*/
    listItems() {
        return this._products.map((product) => product.item).sort();
    }
    ;
    /* This function accepts one required parameter(either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE) and an optional one(Level.HIGHEST or Level.LOWEST).
      For Accounting.QUANTITY, it will collect all the quantity per item.
      For Accounting.REVENUE, it will collect all the revenue(price * quantity) per item.
      For Accounting.PRICE, it will collect all the price per item.
      e.g. {'notepad':123,'laptop':345} */
    // TODO implement the level 
    perItem(acct, level) {
        let quantity = {};
        let revenue = {};
        let price = {};
        this._products.forEach((product) => {
            if (quantity.hasOwnProperty(product.item)) {
                quantity[product.item]++;
            }
            else {
                quantity[product.item] = 0;
            }
        });
        this._products.forEach((product) => {
            price[product.item] = product.price;
        });
        if (acct === DataTypes_1.Accounting.REVENUE) {
            for (const property in quantity) {
                revenue[property] = quantity[property] * price[property];
            }
            return revenue;
        }
        if (acct === DataTypes_1.Accounting.PRICE) {
            return price;
        }
        if (acct === DataTypes_1.Accounting.QUANTITY) {
            return quantity;
        }
    }
    ;
    /* This function computes the total amount of the transaction with respect to the parameter acct, by adding all the values of the perItem.*/
    total(acct, level) {
        let total = 0;
        const items = this.perItem(acct, level);
        for (const property in items) {
            total += items[property];
        }
        return total;
    }
    ;
    /* This function accepts one required parameter(either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE) and an optional one(Level.HIGHEST or Level.LOWEST)
      It computes the values for all the tags existing in this transaction.
      Here's how to compute the value of a tag for each transaction:
      For Accounting.QUANTITY, it will sum up all the quantities of the sold items containing the tag.
      For Accounting.REVENUE, it will sum up only the revenues (price times quantity) of the sold items containing the tag
      For Accounting.PRICE, it will get the highest/lowest price of the item containing the tag depending on the optional level.
      */
    perTag(acct, level) {
        let quantity = {};
        let revenue = {};
        let price = {};
        this._products.forEach(({ tags }) => {
            tags.forEach((tag) => {
                if (quantity.hasOwnProperty(tag)) {
                    quantity[tag]++;
                }
                else {
                    quantity[tag] = 0;
                }
            });
        });
        this._products.forEach(({ tags, price }) => {
            tags.forEach((tag) => {
                price[tag] = price;
            });
        });
        if (acct === DataTypes_1.Accounting.REVENUE) {
            for (const property in quantity) {
                revenue[property] = quantity[property] * price[property];
            }
            return revenue;
        }
        if (acct === DataTypes_1.Accounting.QUANTITY) {
            return quantity;
        }
        // TODO return lowest or highest price based on optional level
        if (acct === DataTypes_1.Accounting.PRICE) {
            return price;
        }
    }
    ;
    // This function gets the day of the week given of the date(e.g. 'Mon', 'Tue', etc.)
    getDay() {
        return new Date(this._saleDate).toDateString().split(" ")[0];
    }
    ;
    // This function gets the year of the given date(e.g. 2020, 2021, etc.)
    getYear() {
        return Number(new Date(this._saleDate).toDateString().split(" ")[3]);
    }
    ;
    // This function gets the month of the given date(e.g. 'Jan', 'Feb', 'Mar' etc.)
    getMonth() {
        return new Date(this._saleDate).toDateString().split(" ")[1];
    }
    ;
}
exports.Transaction = Transaction;
