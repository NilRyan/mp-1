"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(_item, _price) {
        this._item = _item;
        this._price = _price;
    }
    get item() {
        return this._item;
    }
    get price() {
        return this._price;
    }
    set tags(tags) {
        this._tags = tags;
    }
}
exports.Product = Product;
