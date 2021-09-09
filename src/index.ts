import {Parser} from './Parser'
import { Requirements } from './Requirements';
import { Transaction } from './Transaction';
import { Accounting, Period, Order, Level} from './DataTypes';
import { Analytics } from './Analytics';
import { AbstractTransaction } from './AbstractTransaction';
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
let a: Requirements = new Analytics([])
readInterface.on('line', function(line) {
 
  let obj: any = JSON.parse(line)
  // console.log(...obj.items);
  // console.log(obj);
  item.push(...obj.items);
  tags.push(...obj.items);
  locations.push(obj.storeLocation);
  purchaseMeth.push(obj.purchaseMethod)


  let t: AbstractTransaction = new Transaction(Parser.getCustomer(obj), Parser.getProducts(obj),
    Parser.getLocation(obj), Parser.getDate(obj),
    Parser.getSatisfaction(obj), Parser.getCoupon(obj),
    Parser.getPurchaseMethod(obj));
  // console.log(t);
  a.add(t);
}).on('close', function(line) {
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






 


