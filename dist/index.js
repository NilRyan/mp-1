"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Transaction_1 = require("./Transaction");
const DataTypes_1 = require("./DataTypes");
const Analytics_1 = require("./Analytics");
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('out.txt'),
    output: null,
    console: false
});
const a = new Analytics_1.Analytics([]);
readInterface.on('line', function (line) {
    const obj = JSON.parse(line);
    const t = new Transaction_1.Transaction(Parser_1.Parser.getCustomer(obj), Parser_1.Parser.getProducts(obj), Parser_1.Parser.getLocation(obj), Parser_1.Parser.getDate(obj), Parser_1.Parser.getSatisfaction(obj), Parser_1.Parser.getCoupon(obj), Parser_1.Parser.getPurchaseMethod(obj));
    a.add(t);
}).on('close', function (line) {
    console.log(a.listLocations());
    console.log(a.listTags());
    console.log(a.listItems());
    console.log(a.listPurchaseMethods());
    console.log(a.getPrice('Denver', 'notepad', DataTypes_1.Level.HIGHEST));
    console.log(a.getPrice('London', 'backpack', DataTypes_1.Level.LOWEST));
    console.log(a.getSalesFor(DataTypes_1.Period.YEARLY, 'New York'));
    console.log(a.getSalesFor(DataTypes_1.Period.MONTHLY, 'New York'));
    console.log(a.getSalesFor(DataTypes_1.Period.WEEKLY, 'New York'));
    console.log(a.getSales(DataTypes_1.Period.YEARLY, DataTypes_1.Level.LOWEST));
    console.log(a.getSales(DataTypes_1.Period.MONTHLY, DataTypes_1.Level.LOWEST));
    console.log(a.getSales(DataTypes_1.Period.WEEKLY, DataTypes_1.Level.LOWEST));
    console.log(a.getSalesBetween(new Date('2017-01-01'), new Date('2017-01-31'), 'Austin'));
    console.log(a.getSalesBetween(new Date('2017-01-01'), new Date('2017-01-31')));
    console.log(a.rankProductsBy('M', DataTypes_1.Order.ASC));
    console.log(a.rankProductsBy('F', DataTypes_1.Order.DESC));
    console.log(a.rankProductsBy(30, DataTypes_1.Order.DESC));
    console.log(a.rankProductsBy(true, DataTypes_1.Order.DESC));
    console.log(a.rankProductsBy(false, DataTypes_1.Order.DESC));
    console.log(a.rankLocationSatisfactionBy(75, DataTypes_1.Order.ASC));
    console.log(a.rankLocationSatisfactionBy('M', DataTypes_1.Order.ASC));
    console.log(a.rankLocationBy(DataTypes_1.Accounting.REVENUE, DataTypes_1.Order.DESC));
    console.log(a.rankLocationBy(DataTypes_1.Accounting.QUANTITY, DataTypes_1.Order.DESC));
    console.log(a.rankLocationBy(DataTypes_1.Accounting.PRICE, DataTypes_1.Order.DESC, 'binder'));
    console.log(a.medianAge('notepad'));
    console.log(a.medianAge('laptop'));
    console.log(a.medianAge('New York'));
    console.log(a.medianAge('Phone'));
    console.log(a.medianAge('F'));
    // console.log(a.listItems());
    // console.log(a.listLocations());
    // console.log(a.listPurchaseMethods());
    // console.log(a.listTags());
    // console.log(a.getPrice('Denver', 'notepad', Level.LOWEST));
    // console.log(a.getSalesFor(Period.ALL));
    // console.log(a.getSalesFor(Period.YEARLY));
    // console.log(a.getSalesFor(Period.MONTHLY));
    // console.log(a.getSalesFor(Period.WEEKLY));
    // console.log(a.getSales(Period.YEARLY, Level.HIGHEST));
    // console.log(a.getSales(Period.MONTHLY, Level.LOWEST));
    // console.log(a.getSales(Period.WEEKLY, Level.LOWEST));
    // console.log(a.getSalesBetween(new Date("2013-10-06T22:39:37.868Z"), new Date("2016-01-20T17:29:10.225Z")));
    // console.log(a.rankProductsBy('M', Order.DESC));
    // console.log(a.rankLocationSatisfactionBy(true, Order.DESC));
    // console.log(a.rankLocationBy(Accounting.QUANTITY, Order.ASC));
    // console.log(a.rankLocationBy(Accounting.REVENUE, Order.DESC));
    // console.log(a.rankLocationBy(Accounting.PRICE, Order.DESC, 'binder'));
    // console.log(a.medianAge("F"));
    // console.log(a.medianAge('notepad'))
    // console.log(2)
    // console.log(new Set(item.map((i) => i.name))); // Item
    // console.log(new Set(tags.map((i) => {
    //   const tags = i.tags;
    //   return tags;
    // } ).flat())); // Tags
    // console.log(new Set(locations));
    // console.log(new Set(purchaseMeth));
});
// console.log(purchaseMeth)
// console.log(3)
