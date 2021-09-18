export function periodSales<T>(period: T[]): T[] {
  const periodSales = [...new Set(period.map((el) => el[0]))].map((el) => {
    const sale: T = [el, 0] as unknown as T;
    period.forEach((year) => {
      if (year[0] === el) {
        sale[1] += year[1];
      }
     
    });
    return sale;
  });
  return periodSales;
}