export type Item = 'red' | 'blue'; // placeholder
export type Tag = 'brand new' | 'old'; // placeholder
export class Product {
  private _tags: Tag[];
  constructor(private _item: Item, private _price: number) {}

  get item(): Item {
    return this._item;
  }

  get price(): number {
    return this._price;
  }

  set tags(tags: Tag[]) {
    this._tags = tags;
  }

}