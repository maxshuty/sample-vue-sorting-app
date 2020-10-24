export class OrderHistory implements HistoricalOrderData {
  toppings: Array<any>;

  constructor(dto: any = {}) {
    this.toppings = dto.toppings || [];
  }
}
