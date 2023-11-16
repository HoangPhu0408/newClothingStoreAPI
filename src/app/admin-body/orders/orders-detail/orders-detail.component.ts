import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderDetail } from 'src/app/model/orderdetail.model';
import { Order } from 'src/app/model/orders.model';
import { Products } from 'src/app/model/product.model';
import { CustomerService } from 'src/app/services/customers.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
})
export class OrdersDetailComponent {
  orderId: any;
  userId: any;
  user: any;
  username: any;
  userphone: any;
  orderDetailId: any;

  orderDetail: any; //list
  productList: any;
  order: any;
  orderad: any;
  orderdate: any;
  orderstate: any;
  orderprice: any;
  // orderStatus: any
  constructor(
    private orderService: OrderService,
    private router: Router,
    private cusService: CustomerService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    // this.orderService.getOrderListAPI().subscribe(order =>
    //   this.orders = order.reverse()
    // )  }
    this.route.params.subscribe((params: Params) => {
      this.orderId = Number(this.route.snapshot.paramMap.get('id'));
      this.orderDetailId = Number(this.route.snapshot.paramMap.get('id'));

      // this.orderService.getOrderIdAPI(this.orderDetailId).subscribe((data: any) => {
      //     this.orderDetail = data;
      //     console.log(this.orderDetail)
      //   })


      this.order = this.orderService.getOrderIdAPI(this.orderId);
      console.log('bla', this.order);
      this.orderService
        .getOrderDetailByOrderAPI(this.orderDetailId)
        .subscribe((data: any) => {
          this.orderDetail = data;
          console.log(this.orderDetail);
        });

      this.productService
        .getListProdByOrderIdAPI(this.orderId)
        .subscribe((prod: any) => {
          this.productList = prod;
          console.log(this.productList);
        });


      // this.orderService.getOrderIdAPI(this.orderId).subscribe(
      //   (order: any) => {
      //     this.order = order
      //     // this.userId = order.userId
      //   }
      // )
      this.orderService
        .getOrderIdAPICore(this.orderId)
        .subscribe((order: any) => {
          this.order = order;
          this.orderad = order.orderAddress;
          this.orderdate = order.orderDate;
          this.userId = order.userId;
          this.orderprice = order.orderPrice;
          this.orderstate = order.orderStatus
          // this.userId = order.userId
          this.cusService.getCustomerIdAPI(this.userId).subscribe((info: any) => {
            this.user = info;
            this.username = info.userName;
            this.userphone = info.phoneNumber;
          })
        });
      
    });
  }
  confirmOrder(orderId2Confirm: number) {
    this.orderService
      .putOrderConfirmAPI(orderId2Confirm)
      .subscribe((response: any) => {
        console.log('Order confirmed successfully:', response);
        this.order.orderStatus = 1;
        console.log(this.order.orderStatus);

        // Tải lại danh sách đơn hàng sau khi xác nhận
        this.orderService.getOrderIdAPI(this.orderId).subscribe((data) => {
          this.order = data;
        });
      });
    console.log(orderId2Confirm);
  }
  cancelOrder(orderId2Cancel: number) {
    this.orderService
      .putOrderCancelAPI(orderId2Cancel)
      .subscribe((response: any) => {
        console.log('dòn', response);
        // this.order.orderStatus = 2;
        // console.log(this.order.orderStatus);

        // Tải lại danh sách đơn hàng sau khi xác nhận
        this.orderService.getOrderIdAPI(this.orderId).subscribe((data) => {
          this.order = data;
        });
      });
    console.log(orderId2Cancel);
    console.log('bla', this.order.orderStatus);
  }
  test(id: number) {
    this.orderService.getOrderIdAPI(id).subscribe((data) => {
      this.order = data;
      console.log(this.order.orderStatus);
    });
  }
}
