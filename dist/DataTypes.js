"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = exports.Period = exports.Accounting = exports.Order = void 0;
/* Create an enum Order that has the following elements:
ASC for smallest to highest order
DESC for highest to smallest order */
var Order;
(function (Order) {
    Order[Order["ASC"] = 0] = "ASC";
    Order[Order["DESC"] = 1] = "DESC";
})(Order = exports.Order || (exports.Order = {}));
/* Create an enum Accounting that has the following elements:
QUANTITY for the quantity bought
REVENUE for the product of quantity bought and the unit price
PRICE for the unit price of an item */
var Accounting;
(function (Accounting) {
    Accounting[Accounting["QUANTITY"] = 0] = "QUANTITY";
    Accounting[Accounting["PRICE"] = 1] = "PRICE";
    Accounting[Accounting["REVENUE"] = 2] = "REVENUE";
})(Accounting = exports.Accounting || (exports.Accounting = {}));
/* Create an enum Period that has the following elements:
YEARLY for the annual data
MONTHLY for the monthly data
WEEKLY for the day of the week
ALL for all the avaibale data*/
var Period;
(function (Period) {
    Period[Period["YEARLY"] = 0] = "YEARLY";
    Period[Period["MONTHLY"] = 1] = "MONTHLY";
    Period[Period["WEEKLY"] = 2] = "WEEKLY";
    Period[Period["ALL"] = 3] = "ALL";
})(Period = exports.Period || (exports.Period = {}));
/* Create an enum Level that has the following elements:
HIGHEST and LOWEST*/
var Level;
(function (Level) {
    Level[Level["HIGHEST"] = 0] = "HIGHEST";
    Level[Level["LOWEST"] = 1] = "LOWEST";
})(Level = exports.Level || (exports.Level = {}));
