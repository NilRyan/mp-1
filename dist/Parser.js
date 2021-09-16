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
        return obj.saleDate.$date.substr(0, 10);
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
