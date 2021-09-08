"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Analytics_1 = require("./Analytics");
const Parser_1 = require("./Parser");
const Transaction_1 = require("./Transaction");
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('out.txt'),
    output: null,
    console: false
});
let a = new Analytics_1.Analytics([]);
readInterface.on('line', function (line) {
    let obj = JSON.parse(line);
    let t = new Transaction_1.Transaction(Parser_1.Parser.getCustomer(obj), Parser_1.Parser.getProducts(obj), Parser_1.Parser.getLocation(obj), Parser_1.Parser.getDate(obj), Parser_1.Parser.getSatisfaction(obj), Parser_1.Parser.getCoupon(obj), Parser_1.Parser.getPurchaseMethod(obj));
    a.add(t);
    //console.log(1)
}).on('close', function (line) {
    //console.log(a.medianAge('notepad'))
    console.log(2);
});
console.log(3);
