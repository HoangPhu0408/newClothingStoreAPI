import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderDetail } from 'src/app/model/orderdetail.model';
import { Order } from 'src/app/model/orders.model';
import { Products } from 'src/app/model/product.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomerService } from 'src/app/services/customers.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-client-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrls: ['./client-order-details.component.css']
})
export class ClientOrderDetailsComponent {
  orderId: any;
  clientId: any;

  client: any;

  orderDetailId: any;
  orderDetail: any;
  productList: any;

  order: any;
  orderad: any;
  orderdate: any;
  orderstate: any;
  orderprice: any;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private authen: AuthenticationService,
    private cusService: CustomerService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.orderId = Number(this.route.snapshot.paramMap.get('id'));
      this.orderDetailId = Number(this.route.snapshot.paramMap.get('id'));
      this.clientId = this.authen.getCurrentUser();
      this.order = this.orderService.getOrderIdAPI(this.orderId);

      this.cusService.getCustomerIdAPI(this.clientId).subscribe((info: any) => {
        this.client = info;
      })

      this.orderService
        .getOrderDetailByOrderAPI(this.orderDetailId)
        .subscribe((data: any) => {
          this.orderDetail = data;
        });

      this.productService
        .getListProdByOrderIdAPI(this.orderId)
        .subscribe((prod: any) => {
          this.productList = prod;
        });

      this.orderService
        .getOrderIdAPICore(this.orderId)
        .subscribe((order: any) => {
          this.order = order;
          this.orderdate = order.orderDate;
          this.orderad = order.orderAddress;
          this.orderprice = order.orderPrice;
          this.orderstate = order.orderStatus;
        });
    });
  }
  cancelOrder(orderId2Cancel: number) {

    this.orderService
      .putOrderCancelAPI(orderId2Cancel)
      .subscribe((response: any) => {
        this.orderDetail.forEach((element: any) => {
          console.log(element)
          this.productService.increaseAmount(element.productId, element.size, element.quantity).subscribe(
            (response: any) => {
              console.log('Số lượng sản phẩm đã được tăng lại');
              // Thực hiện xử lý sau khi giảm số lượng sản phẩm thành công
            },
            (error: any) => {
              console.error('Lỗi khi tăng số lượng sản phẩm: ', error);
              // Xử lý lỗi nếu có
            }
          )
        });
      });
    console.log(this.orderDetail)
    this.router.navigate(['/clientorder']);
  }
  //  onPaymentCancel() {
  //   this.cartItem.forEach((item) => {
  //     this.productService
  //       .increaseAmount(item.productID, item.productSize, item.quantity)
  //       .subscribe(
  //         (response: any) => {
  //           console.log('Số lượng sản phẩm đã được tăng lại');
  //           // Thực hiện xử lý sau khi giảm số lượng sản phẩm thành công
  //         },
  //         (error: any) => {
  //           console.error('Lỗi khi tăng số lượng sản phẩm: ', error);
  //           // Xử lý lỗi nếu có
  //         }
  //       );
  //   });
}

