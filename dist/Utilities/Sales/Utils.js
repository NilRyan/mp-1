"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodSales = void 0;
function periodSales(period) {
    const periodSales = [...new Set(period.map((el) => el[0]))].map((el) => {
        const sale = [el, 0];
        period.forEach((year) => {
            if (year[0] === el) {
                sale[1] += year[1];
            }
        });
        return sale;
    });
    return periodSales;
}
exports.periodSales = periodSales;
