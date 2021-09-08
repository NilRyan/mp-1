import { AbstractTransaction } from './AbstractTransaction';
import {Analytics} from './Analytics'
import {Parser} from './Parser'
import { Requirements } from './Requirements';
import { Transaction } from './Transaction';
import { Accounting, Period, Order, Level} from './DataTypes';
const readline = require('readline');
const fs = require('fs');


const readInterface = readline.createInterface({
  input: fs.createReadStream('out.txt'),
  output: null,
  console: false
});

let a: Requirements = new Analytics([])
readInterface.on('line', function(line) {
 
  let obj: object = JSON.parse(line)
  

    let t: AbstractTransaction = new Transaction( Parser.getCustomer(obj),Parser.getProducts(obj), 
                                                  Parser.getLocation(obj),Parser.getDate(obj), 
                                                  Parser.getSatisfaction(obj),Parser.getCoupon(obj),
                                                  Parser.getPurchaseMethod(obj))

    a.add(t)

    //console.log(1)

}).on('close', function(line) {
    
    //console.log(a.medianAge('notepad'))
    console.log(2)
   
  });

  console.log(3)



 


