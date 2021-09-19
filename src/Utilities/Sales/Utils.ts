export function periodSales<T>(period: T[]): T[] {
  const periodSales = [...new Set(period.map((el) => el[0]))].map((el) => {
    const sale: T = [el, 0] as unknown as T;
    period.forEach((time) => {
      if (time[0] === el) {
        sale[1] += time[1];
      }
     
    });
    return sale;
  });
  return periodSales;
}