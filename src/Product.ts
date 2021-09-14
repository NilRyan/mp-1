import { Item, Tag } from "./DataTypes";

export class Product {
  private _tags: Tag[];
  constructor(private _item: Item, private _price: number, private _quantity: number) {}

  get item(): Item {
    return this._item;
  }

  get price(): number {
    return this._price;
  }
  
  get quantity(): number {
    return this._quantity;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  set tags(tags: Tag[]) {
    this._tags = tags;
  }

}