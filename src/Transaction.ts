import { AbstractTransaction } from "./AbstractTransaction";
import { Customer } from "./Customer";
import { PurchaseMethod, Location, Item, Accounting, Level, ItemDictionary, Day, Month, TagDictionary } from "./DataTypes";
import { Product } from "./Product";

export class  Transaction extends AbstractTransaction {
  constructor(
     _customer: Customer,
     _products: Product[],
     _location: Location,
     _saleDate: Date,
    _satisfaction: number,
     _coupon: boolean,
     _purchaseMethod: PurchaseMethod
  ) {
    super(
      _customer,
      _products,
      _location,
      _saleDate,
      _satisfaction,
      _coupon,
      _purchaseMethod
    );
  }
  // This function is a getter for the products
  get products(): Product[] {
    return this._products;
  };
  // This function is a getter for the location
  get location(): Location {
    return this._location;
  };
  // This function is a getter for the saleDate
  get saleDate(): Date {
    return this._saleDate;
  };
  // This function is a getter for the customer
  get customer(): Customer {
    return this._customer;
  };
  // This function is a getter for the coupon
  get coupon(): boolean {
    return this._coupon;
  };
  // This function is a getter for the purchaseMethod
  get purchaseMethod(): PurchaseMethod {
    return this._purchaseMethod;
  };
  // This function is a getter for the satisfaction
  get satisfaction(): number {
    return this._satisfaction;
  };

  /* This function returns an array of items being sold in this transaction in an alphabetical order*/
  listItems(): Item[] {
    return this._products.map((product) => product.item).sort();
  };

  /* This function accepts one required parameter(either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE) and an optional one(Level.HIGHEST or Level.LOWEST).
    For Accounting.QUANTITY, it will collect all the quantity per item.
    For Accounting.REVENUE, it will collect all the revenue(price * quantity) per item.
    For Accounting.PRICE, it will collect all the price per item.
    e.g. {'notepad':123,'laptop':345} */
  // TODO implement the level 
  perItem(acct: Accounting, level?: Level): ItemDictionary {
    let quantity: ItemDictionary = {};
    let revenue: ItemDictionary = {};
    let price: ItemDictionary = {};
    
    //* Used forEach to count quantity of an item in the Product[]
    this._products.forEach((product) => {
        if (quantity.hasOwnProperty(product.item)) {
          quantity[product.item]++;
        } else {
          quantity[product.item] = 0;
        }
    })
    
    //* Used forEach to determine the prices of each item, a product array can have
    //* multiple items with the same name and different prices
    //* Will implement level to determine highest or lowest prices in the item dictionary
    //! Implemented highest prices as default for now
    this._products.forEach((product) => {
      if (price.hasOwnProperty(product.item)) {
        price[product.item] = price[product.item] < product.price ? product.price : price[product.item];
      } else {
        price[product.item] = product.price;
      }
    })
    console.log(price);
    
    if (acct === Accounting.REVENUE) {
      for (const property in quantity) {
        revenue[property] = quantity[property] * price[property];
      }
      return revenue;
    }
   
    // console.log(price);
    
    if (acct === Accounting.PRICE) {
      return price;
    }
    if (acct === Accounting.QUANTITY) {
      return quantity;
    }
  };

  /* This function computes the total amount of the transaction with respect to the parameter acct, by adding all the values of the perItem.*/
  total(acct: Accounting, level?: Level): number {
    let total: number = 0;
    const items: ItemDictionary = this.perItem(acct, level);
    for (const property in items) {
      total += items[property];
    }
    return total;
  };

  /* This function accepts one required parameter(either Accounting.QUANTITY, Accounting.REVENUE or Accounting.PRICE) and an optional one(Level.HIGHEST or Level.LOWEST)
    It computes the values for all the tags existing in this transaction.
    Here's how to compute the value of a tag for each transaction:
    For Accounting.QUANTITY, it will sum up all the quantities of the sold items containing the tag.
    For Accounting.REVENUE, it will sum up only the revenues (price times quantity) of the sold items containing the tag
    For Accounting.PRICE, it will get the highest/lowest price of the item containing the tag depending on the optional level. 
    */
  perTag(acct: Accounting, level?: Level): TagDictionary {
    let quantity: TagDictionary = {};
    let revenue: TagDictionary = {};
    let price: TagDictionary = {};
   
    this._products.forEach(({ tags }) => {
      tags.forEach((tag) => {
        if (quantity.hasOwnProperty(tag)) {
          quantity[tag]++;
        } else {
          quantity[tag] = 0;
        }
      })  
    })
   
    this._products.forEach(({tags, price}) => {
      tags.forEach((tag) => {
        price[tag] = price;
      })
    })
    
    if (acct === Accounting.REVENUE) {
      for (const property in quantity) {
        revenue[property] = quantity[property] * price[property];
      }
      return revenue;
    }

    if (acct === Accounting.QUANTITY) {
      return quantity;
    }
    // TODO return lowest or highest price based on optional level
    if (acct === Accounting.PRICE) {
      return price;
    }

  };

  // This function gets the day of the week given of the date(e.g. 'Mon', 'Tue', etc.)
  getDay(): Day {
    return new Date(this._saleDate).toDateString().split(" ")[0] as Day;
  };

  // This function gets the year of the given date(e.g. 2020, 2021, etc.)
  getYear(): number {
    return Number(new Date(this._saleDate).toDateString().split(" ")[3]);
  };

  // This function gets the month of the given date(e.g. 'Jan', 'Feb', 'Mar' etc.)
  getMonth(): Month {
    return new Date(this._saleDate).toDateString().split(" ")[1] as Month;
  };

   

    
  }

  

