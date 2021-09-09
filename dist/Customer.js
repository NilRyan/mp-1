"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    _gender;
    _age;
    _email;
    constructor(_gender, _age, _email) {
        this._gender = _gender;
        this._age = _age;
        this._email = _email;
    }
    ;
    get gender() {
        return this._gender;
    }
    get age() {
        return this._age;
    }
    get email() {
        return this._email;
    }
}
exports.Customer = Customer;
