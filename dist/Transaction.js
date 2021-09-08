"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const AbstractTransaction_1 = require("./AbstractTransaction");
class Transaction extends AbstractTransaction_1.AbstractTransaction {
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
}
exports.Transaction = Transaction;
