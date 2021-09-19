import { Accounting, AttributesA, AttributesB, GenderEnum, isType, Item, ItemDictionary, Items, Locations, Location, LocDictionary, Order, PurchaseMethod, Gender, Genders, PurchaseMethods, Level} from "../../DataTypes";
import { Transaction } from "../../Transaction";

export function countPerItem(filteredSales: Transaction[]): ItemDictionary {
  const perItem: [Item, number][] = filteredSales
    .map((transaction) => {
      return Object.entries(transaction.perItem(Accounting.QUANTITY));
    })
    .flat() as [Item, number][];
  
  const itemQuantity: ItemDictionary = perItem.reduce((dict, [item, qty]) => {
    dict[item] = dict[item] ? dict[item] + qty : qty;
    return dict;
  }, {})
  return itemQuantity;
}

export function countPerLocation(acct: Accounting, order: Order, sales: Transaction[], item?: Item): LocDictionary {
  if (acct === Accounting.QUANTITY || acct === Accounting.REVENUE) {
    const locQuantity: LocDictionary = sales
      .map((transaction) => [transaction.location, transaction.total(acct)])
      .reduce((dict, [loc, qty]) => {
        dict[loc] = dict[loc] ? dict[loc] + qty : qty;
        return dict;
      }, {});
    return locQuantity;
  }
 
  const locQuantity: LocDictionary = {};
  if (acct === Accounting.PRICE) {
    const level = order === Order.ASC ? Level.LOWEST : Level.HIGHEST;
    sales.map((transaction) => {
        const price = transaction.perItem(acct, level)[item] ? transaction.perItem(acct, level)[item] : 0;
        return [transaction.location, Number(price)];
    })
      .filter(([_, price]) => price !== 0)
      .forEach(([loc, price]) => {
        if (locQuantity[loc] !== undefined) {
          if (level === Level.HIGHEST) {
            locQuantity[loc] = locQuantity[loc] < price ? price : locQuantity[loc];
          }
          if (level === Level.LOWEST) {
            locQuantity[loc] = locQuantity[loc] < price ? locQuantity[loc] : price;
            
          }
        } else {
          locQuantity[loc] = price;
        }

      });
      return locQuantity;
    }
    
 
}
export function filterByCategoryA(category: AttributesA, sales: Transaction[]): Transaction[] {
  let filteredSales: Transaction[];
  if (category === GenderEnum.M || category === GenderEnum.F) {
    filteredSales = sales.filter(
      ({customer}) => customer.gender === category
    );
  }

  if (typeof category === "boolean") {
    filteredSales = category
      ? sales.filter(({coupon}) => coupon === true)
      : sales.filter(({coupon}) => coupon === false);
  }
  if (typeof category === "number") {
    filteredSales = sales.filter(
      ({customer}) => customer.age === category
    );
  }
  return filteredSales;
}
export function filterByCategoryB(category: AttributesB, sales: Transaction[]): Transaction[] {
  let filteredTransaction: Transaction[] = [];
  if (isType<AttributesB>(category, Items)) {
    filteredTransaction = sales
      .filter((transaction) => transaction.listItems().includes(category as Item))   
  }
  if (isType<AttributesB>(category, Locations)) {
    filteredTransaction = sales
      .filter(({location}) => location === category as Location)
  }
  if (isType<AttributesB>(category, PurchaseMethods)) {
    filteredTransaction = sales
      .filter(({purchaseMethod}) => purchaseMethod === category as PurchaseMethod)
  }
  if (isType<AttributesB>(category, Genders)) {
      filteredTransaction = sales
        .filter(({customer}) => customer.gender === category as Gender)
  }
  return filteredTransaction;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sortCallBack(order: Order) {
  if (Order.ASC === order) {
    return ([name1, qty1], [name2, qty2]) => {
      return qty1 - qty2 === 0 ? name2.localeCompare(name1) : qty1 - qty2;
    }
  } else {
    return ([name1, qty1], [name2, qty2]) => {
      return qty2 - qty1 === 0 ? name1.localeCompare(name2) : qty2 - qty1;
    }
  }

}
export function averageSatisfaction(filteredSales: Transaction[]): LocDictionary {
  const locTotalSatisfaction: LocDictionary = {};
  const locCustomerCount: LocDictionary = {};
  const locAvgSatisfaction: LocDictionary = {};
  filteredSales.forEach(({location, satisfaction}) => {
    if (locTotalSatisfaction[location] !== undefined) {
      locTotalSatisfaction[location] += satisfaction;
      locCustomerCount[location] += 1;
    } else {
      locTotalSatisfaction[location] = satisfaction;
      locCustomerCount[location] = 1;
    }
  });
  for (const location in locTotalSatisfaction) {
    locAvgSatisfaction[location] = locTotalSatisfaction[location] / locCustomerCount[location];
  }
  return locAvgSatisfaction;
}

export function median(numbers: number[]): number {
  let median = 0;
  const numsLen = numbers.length;
  numbers.sort();

  numsLen % 2 === 0
    ? (median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2)
    : (median = numbers[(numsLen - 1) / 2]);
  return median;
}

