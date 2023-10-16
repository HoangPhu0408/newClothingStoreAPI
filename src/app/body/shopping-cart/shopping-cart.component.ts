import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  cartItem: CartItem[] = [];
  order: any
  quantityCart = 0;
  finalPrice = 0;
  selectedProduct: any
  selectedSize: string =''
  orderedProducts: any[] = []; // Mảng chứa thông tin đặt hàng của các sản phẩm và kích thước

  constructor(
    private shoppingCart: ShoppingCartService
    , private router: Router
    , private product: ProductService
    , private authenticationService: AuthenticationService
  ) { }
  ngOnInit(): void {

    this.quantityCart = this.shoppingCart.getQuantity();
    this.finalPrice = this.shoppingCart.getPrice();
    this.cartItem = this.shoppingCart.cartItem;
    // this.orderedProducts = this.shoppingCart.getOrderedProducts();

  }
  get cartItems() {
    return this.shoppingCart.getShoppingCart();
  }
  InCreaseQuantity(prodID: number) {
    this.shoppingCart.PlusQuantity(prodID);
    this.quantityCart = this.shoppingCart.getQuantity();
    // this.finalPrice = this.shoppingCart.GetFinalPrice();
  }
  DeCreaseQuantity(prodID: number) {
    this.shoppingCart.MinusQuantity(prodID);
    this.quantityCart = this.shoppingCart.getQuantity();
    // this.finalPrice = this.shoppingCart.GetFinalPrice();
  }

  DeleteProduct(prodID: number) {
    this.shoppingCart.DeleteProdCart(prodID);
    this.cartItem = this.shoppingCart.cartItem;
    this.quantityCart = this.shoppingCart.getQuantity();
    // this.finalPrice = this.shoppingCart.GetFinalPrice();
  }
  //chỗ này giảm số lượng size trong db

  onPayment() {
    console.log(this.finalPrice)
    // if (this.authenticationService.customerLoginState) {
      this.cartItem.forEach(item => {
      const cartitem = {
        productId: item.productID,
        productName: item.productName,
        size: item.productSize,
        imgpath: item.imgPath,
        quantity: item.quantity,
        price: item.officialPrice
      }
      this.shoppingCart.PayMent(cartitem).subscribe({
        next: (data) => {
          // Xử lý dữ liệu ở đây
          console.log('Đặt hàng thành công', data);
        },
        error: (error) => {
          // Xử lý lỗi ở đây
          console.error('Lỗi khi đặt hàng', error);
        },
        complete: () => {
          // Xử lý khi hoàn thành ở đây (tùy chọn)
          console.log('Hoàn thành.');
        }
        });
      })
      this.router.navigate(['payment'])
    }
    // else {
    //   this.router.navigate(['login'])
    // }
  }





// }
