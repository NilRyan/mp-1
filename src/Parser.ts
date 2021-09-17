import { Customer } from "./Customer";
import { PurchaseMethod, Location } from "./DataTypes";
import { Product } from "./Product";

export class Parser {
  static getCustomer(obj: any): Customer {
    return obj.customer;
  }
  static getProducts(obj: any): Product[] {
    const products = [];
    obj.items.forEach((item) => {
      const product = new Product(item.name, item.price.$numberDecimal, item.quantity);
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
    return obj.customer.satisfaction;
  }
  static getCoupon(obj: any): boolean {
    return obj.couponUsed;
  }
  static getPurchaseMethod(obj: any): PurchaseMethod {
    return obj.purchaseMethod;
  }
}
