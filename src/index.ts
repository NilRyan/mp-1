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
const item = [];
const tags = [];
const locations = [];
const purchaseMeth = [];
const a: Requirements = new Analytics([])
readInterface.on('line', function(line) {
 
  const obj: any = JSON.parse(line)
  // console.log(...obj.items);
  // console.log(obj);
  item.push(...obj.items);
  tags.push(...obj.items);
  locations.push(obj.storeLocation);
  purchaseMeth.push(obj.purchaseMethod);


  const t: AbstractTransaction = new Transaction(Parser.getCustomer(obj), Parser.getProducts(obj),
    Parser.getLocation(obj), Parser.getDate(obj),
    Parser.getSatisfaction(obj), Parser.getCoupon(obj),
    Parser.getPurchaseMethod(obj));
  a.add(t);
}).on('close', function (line) {
  console.log(a.listLocations());
  console.log(a.listTags());
  console.log(a.listItems());
  console.log(a.listPurchaseMethods());
  console.log(a.getPrice('Denver', 'notepad', Level.HIGHEST));
  console.log(a.getPrice('London', 'backpack', Level.LOWEST));
  console.log(a.getSalesFor(Period.YEARLY, 'New York'));
  console.log(a.getSalesFor(Period.MONTHLY, 'New York'));
  console.log(a.getSalesFor(Period.WEEKLY, 'New York'));
  console.log(a.getSales(Period.YEARLY, Level.LOWEST));
  console.log(a.getSales(Period.MONTHLY, Level.LOWEST));
  console.log(a.getSales(Period.WEEKLY, Level.LOWEST));
  console.log(a.getSalesBetween(new Date('2017-01-01'), new Date('2017-01-31'), 'Austin'));
  console.log(a.getSalesBetween(new Date('2017-01-01'), new Date('2017-01-31')));
  console.log(a.rankProductsBy('M', Order.ASC));
  console.log(a.rankProductsBy('F', Order.DESC));
  console.log(a.rankProductsBy(30, Order.DESC));
  console.log(a.rankProductsBy(true, Order.DESC));
  console.log(a.rankProductsBy(false, Order.DESC));
  console.log(a.rankLocationSatisfactionBy(75, Order.ASC));
  console.log(a.rankLocationSatisfactionBy('M', Order.ASC));
  console.log(a.rankLocationBy(Accounting.REVENUE, Order.DESC));
  console.log(a.rankLocationBy(Accounting.QUANTITY, Order.DESC));
  console.log(a.rankLocationBy(Accounting.PRICE, Order.DESC, 'binder'));
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




 


