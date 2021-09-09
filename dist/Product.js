"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    _item;
    _price;
    _tags;
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
    get tags() {
        return this._tags;
    }
    set tags(tags) {
        this._tags = tags;
    }
}
exports.Product = Product;
