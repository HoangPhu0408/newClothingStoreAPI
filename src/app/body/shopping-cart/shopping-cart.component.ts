import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Products } from 'src/app/model/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  cartItem: CartItem[] = [];
  userId: any;
  order: any;
  img: any;
  quantityCart = 0;
  finalPrice = 0;
  selectedProduct: any;
  productDetails: any[] = [];
  selectedSize: string = '';
  orderedProducts: any[] = []; // Mảng chứa thông tin đặt hàng của các sản phẩm và kích thước
  products: any;

  constructor(
    private shoppingCart: ShoppingCartService,
    private router: Router,
    private product: ProductService,
    private authen: AuthenticationService
  ) { }
  ngOnInit(): void {
    this.quantityCart = this.shoppingCart.getQuantity();
    this.finalPrice = this.shoppingCart.getPrice();
    this.cartItem = this.shoppingCart.cartItem;
    this.products = this.product.getProductIdAPI;
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
  DeleteProduct(prodID: number, size: string) {
    this.shoppingCart.DeleteProdCart(prodID, size);
    this.cartItem = this.shoppingCart.cartItem;
    this.quantityCart = this.shoppingCart.getQuantity();
    // this.finalPrice = this.shoppingCart.GetFinalPrice();
  }
  //chỗ này giảm số lượng size trong db

  onPayment() {
    // console.log(this.finalPrice)
    if (this.authen.customerLoginState) {
      this.cartItem.forEach((item) => {
        const cartitem = {
          productId: item.productID,
          productName: item.productName,
          size: item.productSize,
          imgpath: item.imgPath,
          quantity: item.quantity,
          price: item.officialPrice * item.quantity,
        };
        this.product
          .reduceAmount(item.productID, item.productSize, item.quantity)
          .subscribe(
            (response) => {
              console.log('Số lượng sản phẩm đã được giảm.');
              // Thực hiện xử lý sau khi giảm số lượng sản phẩm thành công
            },
            (error) => {
              console.error('Lỗi khi giảm số lượng sản phẩm: ', error);
              // Xử lý lỗi nếu có
            }
          );
      });
      this.shoppingCart.cartItem = this.cartItem;
      this.router.navigate(['payment']);
    } else {
      // alert("Vui lòng đăng nhập")
      this.router.navigate(['login']);
    }
  }
}
