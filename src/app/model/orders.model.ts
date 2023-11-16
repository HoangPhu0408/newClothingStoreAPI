import { OrderService } from '../services/order.service';

export class Order {
  orderId: number;
  userId: number;
  orderDate: string;
  // orderAddress: string
  orderSize: string;
  orderQuantity: number;
  orderPrice: number;
  orderStatus: number;

  // orderAddress: string

  // private orderService: OrderService
  constructor(
    public _order_Id: number,
    _totalPrice: number,
    _quantity: number,
    _size: string
  ) {
    this.orderId = _order_Id;
    this.userId = 1;
    this.orderDate =
    new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
    // this.orderAddress = ''
    this.orderSize = _size;
    this.orderQuantity = _quantity;
    this.orderPrice = _totalPrice;
    this.orderStatus = 0;
  }
}
