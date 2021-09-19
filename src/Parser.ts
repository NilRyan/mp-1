/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Customer } from "./Customer";
import { PurchaseMethod, Location } from "./DataTypes";
import { Product } from "./Product";

export class Parser {
  static getCustomer(obj: any): Customer {
    return new Customer(obj.customer.gender, Number(obj.customer.age), obj.customer.email);
  }
  static getProducts(obj: any): Product[] {
    const products = [];
    obj.items.forEach((item) => {
      const product = new Product(item.name, Number(item.price.$numberDecimal), item.quantity);
      product.tags = item.tags;
      products.push(product);
    })
    return products;
  }
  static getLocation(obj: any): Location {
    return obj.storeLocation;
  }
  static getDate(obj: any): Date {
    return obj.saleDate.$date.substr(0, 10);
  }
  static getSatisfaction(obj: any): number {
    return Number(obj.customer.satisfaction);
  }
  static getCoupon(obj: any): boolean {
    return obj.couponUsed;
  }
  static getPurchaseMethod(obj: any): PurchaseMethod {
    return obj.purchaseMethod;
  }
}
