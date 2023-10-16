import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';
import { CartItem } from '../model/cart-item.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  //category_dropdown: Categories[] = [];
  cateList: any
  categoryId: any
  cateState: boolean = false
  totalCart: number = 0;
  customerName: string = ''
  customerState: boolean = false;
  constructor(private productService: ProductService, private router: Router, private shoppingCart : ShoppingCartService ,private authenticationService: AuthenticationService, private route:ActivatedRoute) {}
  ngOnInit(): void {
    // this.totalCart = this.shoppingCartService.GetTotalCart();
  

    this.authenticationService.userLoginEmitter.subscribe((event) => {
      this.customerName = event
    })
    this.authenticationService.customerStated.subscribe((event) => {
      this.customerState = event
    })
    this.productService.getCategoryListAPI().subscribe((categories) => {
      this.cateList = categories;
    });
    this.shoppingCart.cartQuantityChanged.subscribe(count => {
      this.totalCart = count;
    })
    // this.cartService.cartQuantityChanged.subscribe(count => {
    //   this.totalCart = count;
    // })
  }
  toFavorList() {
    if (this.authenticationService.customerLoginState) {
      this.router.navigate(['/favorite-list']);
    } else {
      alert("Vui lòng đăng nhập")
      this.router.navigate(['/login']);
    }
  }
  navigateToProductList(categoryId: number) {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log('Category ID:', categoryId);
      // this.cateState = true
      this.router.navigate(['/product-list', categoryId]);
    });

  }
  // onSelectCategory(categoryId: number) {
  //   this.productService.setSelectedCategory(categoryId);
  // }

  SearchSubmit(form:NgForm){
    // alert(form.value.search_string);
    const searchString = form.value.search_string;
    console.log(searchString);
    form.reset();
    this.router.navigate(['/search', searchString]);
    
  }

  // onLogOut() {
  //   this.authenticationService.LogOut();
  // }

  // onOrderList() {
  //   this.router.navigate(['order-list'])
  // }

}
