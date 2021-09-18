import { Accounting, AttributesA, AttributesB, GenderEnum, isType, Item, ItemDictionary, Items, Locations, Location, LocDictionary, Order, PurchaseMethod, Gender, Genders, PurchaseMethods, Level, TagDictionary } from "../../DataTypes";
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
  const level = order === Order.ASC ? Level.LOWEST : Level.HIGHEST;
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
    sales
      .map((transaction) => {
        const price = transaction.perItem(acct)[item]
          ? transaction.perItem(acct)[item]
          : 0;
        return [transaction.location, price];
      })
      .forEach(([loc, price]) => {
        if (locQuantity[loc] !== undefined) {
          if (level === Level.HIGHEST) {
            locQuantity[loc] = locQuantity[loc] < price ? price : locQuantity[loc];
          }
          if (level === Level.LOWEST) {
            locQuantity[loc] = locQuantity[loc] < price ? locQuantity[loc] : price ;
          }
        } else {
          locQuantity[loc] = price;
        }
      });
    }
    
    return locQuantity;
}
export function filterByCategoryA(category: AttributesA, sales: Transaction[]): Transaction[] {
  let filteredSales: Transaction[];
  if (category === GenderEnum.M) {
    filteredSales = sales.filter(
      (transaction) => transaction.customer.gender === GenderEnum.M
    );
  }
  if (category === GenderEnum.F) {
    filteredSales = sales.filter(
      (transaction) => transaction.customer.gender === GenderEnum.F
    );
  }
  if (typeof category === "boolean") {
    filteredSales = category
      ? sales.filter((transaction) => transaction.coupon === true)
      : sales.filter((transaction) => transaction.coupon === false);
  }
  if (typeof category === "number") {
    filteredSales = sales.filter(
      (transaction) => transaction.customer.age === category
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
      .filter((transaction) => transaction.location === category as Location)
  }
  if (isType<AttributesB>(category, PurchaseMethods)) {
    filteredTransaction = sales
      .filter((transaction) => transaction.purchaseMethod === category as PurchaseMethod)
  }
  if (isType<AttributesB>(category, Genders)) {
    if (category === 'M') {
      filteredTransaction = sales
        .filter((transaction) => transaction.customer.gender === 'M' as Gender)
    }
    if (category === 'F') {
      filteredTransaction = sales
        .filter((transaction) => transaction.customer.gender === 'F' as Gender)
    }
  }
  return filteredTransaction;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sortCallBack(order: Order) {
  return Order.ASC === order ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1];
}
export function averageSatisfaction(filteredSales: Transaction[]): LocDictionary {
  const locTotalSatisfaction: LocDictionary = {};
  const locCustomerCount: LocDictionary = {};
  const locAvgSatisfaction: LocDictionary = {};
  filteredSales.forEach((transaction) => {
    if (locTotalSatisfaction[transaction.location] !== undefined) {
      locTotalSatisfaction[transaction.location] += transaction.satisfaction;
      locCustomerCount[transaction.location] += 1;
    } else {
      locTotalSatisfaction[transaction.location] = transaction.satisfaction;
      locCustomerCount[transaction.location] = 1;
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

