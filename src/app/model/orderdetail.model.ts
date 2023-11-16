export class OrderDetail {
  orderDetailsId: number;
  orderId: number;
  productId: number;
  size: string;
  quantity: number;
  price: number;

  // orderAddress: string

  // private orderService: OrderService
  constructor(
    _orderDetailsId: number,
    _order_Id: number,
    _productId: number,
    _quantity: number,
    _size: string,
    _price: number
  ) {
    this.orderDetailsId = _orderDetailsId;
    this.orderId = _order_Id;
    this.productId = _productId;
    this.size = _size;
    this.quantity = _quantity;
    this.price = _price;
  }
}
