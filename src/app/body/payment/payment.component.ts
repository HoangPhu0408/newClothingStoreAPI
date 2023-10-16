import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  cartItem: CartItem[] = []
  orderIdByUser: any
  finalPrice: any
  diachi: string = " "
  customerInfo: any
  date: any

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }
  ngOnInit(): void {
    this.cartItem = this.shoppingCartService.cartItem
    this.finalPrice = this.shoppingCartService.getPrice()
    // this.customerInfo = this.authenticationService.customerInfo
    this.date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
  }
  onPaymentConfirmed() {
    // Gọi phương thức checkout của CartService để lưu thông tin đơn hàng
    console.log('Giá trị nhập vào là: ' + this.diachi);
    const order = {
      userId: 1,
      totalPrice: this.finalPrice,
      totalQuantity: this.shoppingCartService.getQuantity(),
      orderDate: new Date(this.date).toISOString(),
      orderAddress: this.diachi,
      statusOrder: 0
    
    }
    console.log(order)

    // this.cartService.PostOrder(order).subscribe(
    //   (response) => {
    //     this.orderIdByUser = response.orderId
    //     console.log("Thành công")
    //     console.log("Day la list:" + response)
    //     console.log(this.orderIdByUser)
    //     // console.log(this.lstCartItems)
    //     this.lstCartItems.forEach(item => {
    //       const orderDetail = {
    //             orderId: this.orderIdByUser,
    //             productId: item.productID,
    //             unitPrice: item.price,
    //             quantity: item.quantity
    //           };
    //           console.log(orderDetail)
          
    //           this.cartService.PostOrderDetails(orderDetail).subscribe(
    //             (response) => {
    //               console.log(response)
    //             }
    //           )
    //     });
    //     }
    // )
    // this.cartService.checkout(order);
    this.shoppingCartService.ClearCart()
    // alert(order)
    this.router.navigate(['thanks-page'])
  

  }
  // onCheckOut() {
  //   const order = {
  //     // userId: this.authenticationService.customerInfo.userId,
  //     totalPrice: this.finalPrice,
  //     totalQuantity: this.cartService.GetTotalCart(),
  //     orderDate: new Date(this.date).toISOString(),
  //     orderAddress: this.addressData,
  //     statusOrder: 0
  //   }

  //   this.cartService.PostOrder(order).subscribe(
  //     (response) => {
  //       this.orderIdByUser = response.orderId
  //       console.log("Thành công")
  //       console.log("Day la list:" + response)
  //       console.log(this.orderIdByUser)
  //       // console.log(this.lstCartItems)
  //       this.lstCartItems.forEach(item => {
  //         const orderDetail = {
  //           orderId: this.orderIdByUser,
  //           productId: item.productID,
  //           unitPrice: item.price,
  //           quantity: item.quantity
  //         };
  //         console.log(orderDetail)

  //         this.cartService.PostOrderDetails(orderDetail).subscribe(
  //           (response) => {
  //             console.log(response)
  //           }
  //         )
  //       });



  //     }

  //   )


  //   this.cartService.ClearCart()
  //   alert("thanh cong")
  //   this.router.navigate(['thanks-page'])
  // }

}
