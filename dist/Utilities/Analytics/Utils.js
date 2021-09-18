"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = exports.averageSatisfaction = exports.sortCallBack = exports.filterByCategoryB = exports.filterByCategoryA = exports.countPerLocation = exports.countPerItem = void 0;
const DataTypes_1 = require("../../DataTypes");
function countPerItem(filteredSales) {
    const itemQuantity = {};
    const perItem = filteredSales
        .map((transaction) => {
        return Object.entries(transaction.perItem(DataTypes_1.Accounting.QUANTITY));
    })
        .flat();
    perItem.forEach((item) => {
        if (itemQuantity[item[0]] !== undefined) {
            itemQuantity[item[0]] += item[1];
        }
        else {
            itemQuantity[item[0]] = item[1];
        }
    });
    return itemQuantity;
}
exports.countPerItem = countPerItem;
function countPerLocation(acct, order, sales, item) {
    const locQuantity = {};
    const level = order === DataTypes_1.Order.ASC ? DataTypes_1.Level.LOWEST : DataTypes_1.Level.HIGHEST;
    if (acct === DataTypes_1.Accounting.QUANTITY || acct === DataTypes_1.Accounting.REVENUE) {
        sales
            .map((transaction) => [transaction.location, transaction.total(acct)])
            .forEach((loc) => {
            if (locQuantity[loc[0]] !== undefined) {
                locQuantity[loc[0]] += Number(loc[1]);
            }
            else {
                locQuantity[loc[0]] = Number(loc[1]);
            }
        });
    }
    if (acct === DataTypes_1.Accounting.PRICE) {
        sales
            .map((transaction) => {
            const price = transaction.perItem(acct)[item]
                ? transaction.perItem(acct)[item]
                : 0;
            return [transaction.location, price];
        })
            .forEach((loc) => {
            if (locQuantity[loc[0]] !== undefined) {
                if (level === DataTypes_1.Level.HIGHEST) {
                    locQuantity[loc[0]] = locQuantity[loc[0]] < Number(loc[1]) ? loc[1] : locQuantity[loc[0]];
                }
                if (level === DataTypes_1.Level.LOWEST) {
                    locQuantity[loc[0]] = locQuantity[loc[0]] < Number(loc[1]) ? locQuantity[loc[0]] : loc[1];
                }
            }
            else {
                locQuantity[loc[0]] = Number(loc[1]);
            }
        });
    }
    return locQuantity;
}
exports.countPerLocation = countPerLocation;
function filterByCategoryA(category, sales) {
    let filteredSales;
    if (category === DataTypes_1.GenderEnum.M) {
        filteredSales = sales.filter((transaction) => transaction.customer.gender === DataTypes_1.GenderEnum.M);
    }
    if (category === DataTypes_1.GenderEnum.F) {
        filteredSales = sales.filter((transaction) => transaction.customer.gender === DataTypes_1.GenderEnum.F);
    }
    if (typeof category === "boolean") {
        filteredSales = category
            ? sales.filter((transaction) => transaction.coupon === true)
            : sales.filter((transaction) => transaction.coupon === false);
    }
    if (typeof category === "number") {
        filteredSales = sales.filter((transaction) => transaction.customer.age === category);
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
            .filter((transaction) => transaction.location === category);
    }
    if ((0, DataTypes_1.isType)(category, DataTypes_1.PurchaseMethods)) {
        filteredTransaction = sales
            .filter((transaction) => transaction.purchaseMethod === category);
    }
    if ((0, DataTypes_1.isType)(category, DataTypes_1.Genders)) {
        if (category === 'M') {
            filteredTransaction = sales
                .filter((transaction) => transaction.customer.gender === 'M');
        }
        if (category === 'F') {
            filteredTransaction = sales
                .filter((transaction) => transaction.customer.gender === 'F');
        }
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
    filteredSales.forEach((transaction) => {
        if (locTotalSatisfaction[transaction.location] !== undefined) {
            locTotalSatisfaction[transaction.location] += transaction.satisfaction;
            locCustomerCount[transaction.location] += 1;
        }
        else {
            locTotalSatisfaction[transaction.location] = transaction.satisfaction;
            locCustomerCount[transaction.location] = 1;
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
