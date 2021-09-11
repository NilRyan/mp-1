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
let item = [];
let tags = [];
let locations = [];
let purchaseMeth = [];
let a = new Analytics_1.Analytics([]);
readInterface.on('line', function (line) {
    let obj = JSON.parse(line);
    // console.log(...obj.items);
    // console.log(obj);
    item.push(...obj.items);
    tags.push(...obj.items);
    locations.push(obj.storeLocation);
    purchaseMeth.push(obj.purchaseMethod);
    let t = new Transaction_1.Transaction(Parser_1.Parser.getCustomer(obj), Parser_1.Parser.getProducts(obj), Parser_1.Parser.getLocation(obj), Parser_1.Parser.getDate(obj), Parser_1.Parser.getSatisfaction(obj), Parser_1.Parser.getCoupon(obj), Parser_1.Parser.getPurchaseMethod(obj));
    // console.log(t);
    a.add(t);
}).on('close', function (line) {
    // console.log(a.listItems());
    // console.log(a.listLocations());
    // console.log(a.listPurchaseMethods());
    // console.log(a.listTags());
    // console.log(a.getPrice('Denver', 'notepad', Level.HIGHEST));
    // console.log(a.getSalesFor(Period.ALL));
    // console.log(a.getSalesFor(Period.YEARLY));
    // console.log(a.getSalesFor(Period.MONTHLY));
    // console.log(a.getSalesFor(Period.WEEKLY));
    // console.log(a.getSales(Period.YEARLY, Level.LOWEST));
    // console.log(a.getSales(Period.MONTHLY, Level.LOWEST));
    // console.log(a.getSales(Period.WEEKLY, Level.LOWEST));
    // console.log(a.getSalesBetween(new Date("2013-10-06T22:39:37.868Z"), new Date("2016-01-20T17:29:10.225Z")));
    // console.log(a.rankProductsBy(true, Order.DESC));.
    // console.log(a.rankLocationSatisfactionBy(true, Order.DESC));
    console.log(a.rankLocationBy(DataTypes_1.Accounting.QUANTITY, DataTypes_1.Order.ASC));
    console.log(a.rankLocationBy(DataTypes_1.Accounting.REVENUE, DataTypes_1.Order.DESC));
    console.log(a.rankLocationBy(DataTypes_1.Accounting.PRICE, DataTypes_1.Order.DESC));
    //console.log(a.medianAge('notepad'))
    // console.log(2)
    // console.log(new Set(item.map((i) => i.name))); // Item
    // console.log(new Set(tags.map((i) => {
    //   const tags = i.tags;
    //   return tags;
    // } ).flat())); // Tags
    // console.log(new Set(locations));
    // console.log(new Set(purchaseMeth));
});
