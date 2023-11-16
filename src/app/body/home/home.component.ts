import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any;
  selectedCategory: any;
  constructor(
    private productService: ProductService,
    private shoppingCart: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  cateState: any;
  addtocart: any;

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      const categoryId = Number(this.route.snapshot.paramMap.get('id'));
      if (categoryId == 0) {
        this.loadList();
      } else {
        this.productService.getProductByCate(categoryId).subscribe((list) => {
          this.cateState = true;
          this.products = list.reverse();
          console.log('trang thai', this.cateState);
          // this.loadList();
        });
        // console.log(categoryId)
        // this.addtocart = this.shoppingCart.addToCart
      }
    });
  }

  loadList() {
    this.productService.getProductListAPI().subscribe((list) => {
      this.products = [];
      for (let i = 0; i < 3; i++) {
        if (list[i]) {
          this.products.push(list[i]);
        }
      }
    });
  }
}

