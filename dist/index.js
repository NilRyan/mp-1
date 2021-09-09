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
    console.log(a.getSalesFor(DataTypes_1.Period.ALL));
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
console.log(3);
