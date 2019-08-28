export class OrderModel {
  customerName: string;
  customerId: number;
  orderId: number;
  orderTime: string;
  total: number;
  itemspurchased: any[];
  constructor(customerName: string,
              customerId: number,
              orderId: number,
              orderTime: string,
              total: number,
              itemspurchased: any[]) {
    this.customerName = customerName;
    this.customerId = customerId;
    this.orderId = orderId;
    this.orderTime = orderTime;
    this.total = total;
    this.itemspurchased = itemspurchased;
  }


}
