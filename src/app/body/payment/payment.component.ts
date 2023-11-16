import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartItem: CartItem[] = [];
  orderIdByUser: any;
  finalPrice: any;
  finalPrice2: any;
  diachi: string = ' ';
  customerInfo: any;
  currentDate: any;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private authen: AuthenticationService,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.cartItem = this.shoppingCartService.cartItem;
    this.finalPrice = this.shoppingCartService.getPrice();
    // this.customerInfo = this.authenticationService.customerInfo\
    this.finalPrice2 = this.finalPrice + this.finalPrice * 0.1;
    this.currentDate = new Date();
  }
  onPaymentConfirmed() {
    // Gọi phương thức checkout của CartService để lưu thông tin đơn hàng
    console.log('Giá trị nhập vào là: ' + this.diachi);
    const order = {
      userId: this.authen.getCurrentUser(),
      orderDate: this.currentDate,
      orderAddress: this.diachi,
      // orderSize: '',
      orderQuantity: this.shoppingCartService.getQuantity(),
      orderPrice: this.finalPrice2,
      orderStatus: 0
    };
    console.log(order);

    this.shoppingCartService.PostOrder(order).subscribe((response) => {
      this.orderIdByUser = response.orderId;
      console.log('Thành công');
      console.log('Day la list:' + response);
      console.log(this.orderIdByUser);
      // console.log(this.lstCartItems)
      this.cartItem.forEach((item) => {
        const orderDetail = {
          orderId: this.orderIdByUser,
          productId: item.productID,
          size: item.productSize,
          imgPath: item.imgPath,
          price: item.quantity * item.officialPrice,
          quantity: item.quantity
        };
        console.log(orderDetail);

        this.shoppingCartService
          .PostOrderDetails(orderDetail)
          .subscribe((response) => {
            console.log(response);
          });
      });
    });
    console.log(this.cartItem);
    // this.shoppingCartService.checkout(order);
    this.shoppingCartService.ClearCart();
    // alert(order)
    this.router.navigate(['thanks']);
  }
  onPaymentCancel() {
    this.cartItem.forEach((item) => {
      this.productService
        .increaseAmount(item.productID, item.productSize, item.quantity)
        .subscribe(
          (response: any) => {
            console.log('Số lượng sản phẩm đã được tăng lại');
            // Thực hiện xử lý sau khi giảm số lượng sản phẩm thành công
          },
          (error: any) => {
            console.error('Lỗi khi tăng số lượng sản phẩm: ', error);
            // Xử lý lỗi nếu có
          }
        );
    });
  }
}
