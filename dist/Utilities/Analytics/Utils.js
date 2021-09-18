"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = exports.averageSatisfaction = exports.sortCallBack = exports.filterByCategoryB = exports.filterByCategoryA = exports.countPerLocation = exports.countPerItem = void 0;
const DataTypes_1 = require("../../DataTypes");
function countPerItem(filteredSales) {
    const perItem = filteredSales
        .map((transaction) => {
        return Object.entries(transaction.perItem(DataTypes_1.Accounting.QUANTITY));
    })
        .flat();
    const itemQuantity = perItem.reduce((dict, [item, qty]) => {
        dict[item] = dict[item] ? dict[item] + qty : qty;
        return dict;
    }, {});
    return itemQuantity;
}
exports.countPerItem = countPerItem;
function countPerLocation(acct, order, sales, item) {
    const level = order === DataTypes_1.Order.ASC ? DataTypes_1.Level.LOWEST : DataTypes_1.Level.HIGHEST;
    if (acct === DataTypes_1.Accounting.QUANTITY || acct === DataTypes_1.Accounting.REVENUE) {
        const locQuantity = sales
            .map((transaction) => [transaction.location, transaction.total(acct)])
            .reduce((dict, [loc, qty]) => {
            dict[loc] = dict[loc] ? dict[loc] + qty : qty;
            return dict;
        }, {});
        return locQuantity;
    }
    const locQuantity = {};
    if (acct === DataTypes_1.Accounting.PRICE) {
        sales
            .map((transaction) => {
            const price = transaction.perItem(acct)[item]
                ? transaction.perItem(acct)[item]
                : 0;
            return [transaction.location, price];
        })
            .forEach(([loc, price]) => {
            if (locQuantity[loc] !== undefined) {
                if (level === DataTypes_1.Level.HIGHEST) {
                    locQuantity[loc] = locQuantity[loc] < price ? price : locQuantity[loc];
                }
                if (level === DataTypes_1.Level.LOWEST) {
                    locQuantity[loc] = locQuantity[loc] < price ? locQuantity[loc] : price;
                }
            }
            else {
                locQuantity[loc] = price;
            }
        });
    }
    return locQuantity;
}
exports.countPerLocation = countPerLocation;
function filterByCategoryA(category, sales) {
    let filteredSales;
    if (category === DataTypes_1.GenderEnum.M || category === DataTypes_1.GenderEnum.F) {
        filteredSales = sales.filter(({ customer }) => customer.gender === category);
    }
    if (typeof category === "boolean") {
        filteredSales = category
            ? sales.filter(({ coupon }) => coupon === true)
            : sales.filter(({ coupon }) => coupon === false);
    }
    if (typeof category === "number") {
        filteredSales = sales.filter(({ customer }) => customer.age === category);
    }
    return filteredSales;
}
exports.filterByCategoryA = filterByCategoryA;
function filterByCategoryB(category, sales) {
    let filteredTransaction = [];
    if ((0, DataTypes_1.isType)(category, DataTypes_1.Items)) {
        filteredTransaction = sales
            .filter((transaction) => transaction.listItems().includes(category));
    }
    if ((0, DataTypes_1.isType)(category, DataTypes_1.Locations)) {
        filteredTransaction = sales
            .filter(({ location }) => location === category);
    }
    if ((0, DataTypes_1.isType)(category, DataTypes_1.PurchaseMethods)) {
        filteredTransaction = sales
            .filter(({ purchaseMethod }) => purchaseMethod === category);
    }
    if ((0, DataTypes_1.isType)(category, DataTypes_1.Genders)) {
        filteredTransaction = sales
            .filter(({ customer }) => customer.gender === category);
    }
    return filteredTransaction;
}
exports.filterByCategoryB = filterByCategoryB;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function sortCallBack(order) {
    return DataTypes_1.Order.ASC === order ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1];
}
exports.sortCallBack = sortCallBack;
function averageSatisfaction(filteredSales) {
    const locTotalSatisfaction = {};
    const locCustomerCount = {};
    const locAvgSatisfaction = {};
    filteredSales.forEach(({ location, satisfaction }) => {
        if (locTotalSatisfaction[location] !== undefined) {
            locTotalSatisfaction[location] += satisfaction;
            locCustomerCount[location] += 1;
        }
        else {
            locTotalSatisfaction[location] = satisfaction;
            locCustomerCount[location] = 1;
        }
    });
    for (const location in locTotalSatisfaction) {
        locAvgSatisfaction[location] = locTotalSatisfaction[location] / locCustomerCount[location];
    }
    return locAvgSatisfaction;
}
exports.averageSatisfaction = averageSatisfaction;
function median(numbers) {
    let median = 0;
    const numsLen = numbers.length;
    numbers.sort();
    numsLen % 2 === 0
        ? (median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2)
        : (median = numbers[(numsLen - 1) / 2]);
    return median;
}
exports.median = median;
