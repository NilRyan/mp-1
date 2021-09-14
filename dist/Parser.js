"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Product_1 = require("./Product");
class Parser {
    static getCustomer(obj) {
        return obj.customer;
    }
    static getProducts(obj) {
        const products = [];
        obj.items.forEach((item) => {
            const product = new Product_1.Product(item.name, item.price.$numberDecimal, item.quantity);
            product.tags = item.tags;
            products.push(product);
        });
        return products;
    }
    static getLocation(obj) {
        return obj.storeLocation;
    }
    static getDate(obj) {
        return obj.saleDate.$date;
    }
    static getSatisfaction(obj) {
        return obj.customer.satisfaction;
    }
    static getCoupon(obj) {
        return obj.couponUsed;
    }
    static getPurchaseMethod(obj) {
        return obj.purchaseMethod;
    }
}
exports.Parser = Parser;
const obj = {
    _id: { $oid: "5bd761dcae323e45a93ccfe8" },
    saleDate: { $date: "2015-03-23T21:06:49.506Z" },
    items: [
        {
            name: "printer paper",
            tags: ["office", "stationary"],
            price: { $numberDecimal: "40.01" },
            quantity: 2,
        },
        {
            name: "notepad",
            tags: ["office", "writing", "school"],
            price: { $numberDecimal: "35.29" },
            quantity: 2,
        },
        {
            name: "pens",
            tags: ["writing", "office", "school", "stationary"],
            price: { $numberDecimal: "56.12" },
            quantity: 5,
        },
        {
            name: "backpack",
            tags: ["school", "travel", "kids"],
            price: { $numberDecimal: "77.71" },
            quantity: 2,
        },
        {
            name: "notepad",
            tags: ["office", "writing", "school"],
            price: { $numberDecimal: "18.47" },
            quantity: 2,
        },
        {
            name: "envelopes",
            tags: ["stationary", "office", "general"],
            price: { $numberDecimal: "19.95" },
            quantity: 8,
        },
        {
            name: "envelopes",
            tags: ["stationary", "office", "general"],
            price: { $numberDecimal: "8.08" },
            quantity: 3,
        },
        {
            name: "binder",
            tags: ["school", "general", "organization"],
            price: { $numberDecimal: "14.16" },
            quantity: 3,
        },
    ],
    storeLocation: "Denver",
    customer: {
        gender: "M",
        age: 42,
        email: "cauho@witwuta.sv",
        satisfaction: 4,
    },
    couponUsed: true,
    purchaseMethod: "Online",
};
