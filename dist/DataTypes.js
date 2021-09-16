"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderEnum = exports.Level = exports.Period = exports.Accounting = exports.Order = exports.isType = exports.Days = exports.Months = exports.PurchaseMethods = exports.Locations = exports.Tags = exports.Items = exports.Genders = void 0;
// Create a string literal type, Gender that contains all the possible values as can be observed in the data
// Create a string literal type, Item that contains all the possible products as can be observed in the data
// Create a string literal type, Tag that contains all the possible tags of an product as can be observed in the data
// Create a string literal type, Location that contains all the locations as can be observed in the data
// Create a string literal type, PurchaseMethod that contains all the methods of buying as can be observed in the data
// Create a string literal type, Month that contains all the months in this format: 'Jan', 'Feb', 'Mar', etc.
// Create a string literal type, Day that contains all the days of the week in this format: 'Mon', 'Tue', 'Wed', etc.
// Create a type alias, AttributesA which is the union type of Gender, number and boolean
// Create a type alias, AttributesB which is the union types of Item, Location, PurchaseMethod and Gender
// Create a type alias, ItemDictionary which is an object whose optional keys are the string literal types of Item and their corresponding values are of number type
// Create a type alias, TagDictionary which is an object whose optional keys are the string literal types of Tag and their corresponding values are of number type
// Create a type alias, LocDictionary which is an object whose optional keys are the string literal types of Location and their corresponding values are of number type
// Create a type alias, SalesPeriod which is the union type of Month, Day, number and 'All'
const Gender = ['M', 'F'];
exports.Genders = ['M', 'F'];
const Item = ['printer paper', 'envelopes', 'notepad', 'backpack', 'pens', 'binder', 'laptop'];
exports.Items = ['printer paper', 'envelopes', 'notepad', 'backpack', 'pens', 'binder', 'laptop'];
const Tag = ['office', 'stationary', 'writing', 'school', 'travel', 'kids', 'general', 'organization', 'electronics'];
exports.Tags = ['office', 'stationary', 'writing', 'school', 'travel', 'kids', 'general', 'organization', 'electronics'];
const Location = ['Denver', 'Seattle', 'London', 'Austin', 'New York', 'San Diego'];
exports.Locations = ['Denver', 'Seattle', 'London', 'Austin', 'New York', 'San Diego'];
const PurchaseMethod = ['Online', 'Phone', 'In store'];
exports.PurchaseMethods = ['Online', 'Phone', 'In store'];
const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
exports.Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const Day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
exports.Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',];
/* //*Use a function with a generic type to determine if an inputted value is of Type
  //*I did this because I cannot use typeof for type aliases, only primitives have the capability to use typeof
  //*This is due to type aliases not existing at runtime
  //*As a work around we can use this function that finds out if the value is of type using an array */
function isType(value, compare) {
    return compare.includes(value);
}
exports.isType = isType;
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
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["M"] = "M";
    GenderEnum["F"] = "F";
})(GenderEnum = exports.GenderEnum || (exports.GenderEnum = {}));
