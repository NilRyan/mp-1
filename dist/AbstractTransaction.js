"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTransaction = void 0;
class AbstractTransaction {
    _customer;
    _products;
    _location;
    _saleDate;
    _satisfaction;
    _coupon;
    _purchaseMethod;
    constructor(_customer, _products, _location, _saleDate, _satisfaction, _coupon, _purchaseMethod) {
        this._customer = _customer;
        this._products = _products;
        this._location = _location;
        this._saleDate = _saleDate;
        this._satisfaction = _satisfaction;
        this._coupon = _coupon;
        this._purchaseMethod = _purchaseMethod;
    }
}
exports.AbstractTransaction = AbstractTransaction;
// Create a class Transaction which extends this class and implements the abstract functions
