import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  products: any;
  selectedCategory: any;
  constructor(
    private productService: ProductService,
    private shoppingCart: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  // categoryId: any
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
  sortProducts(sortOrder: string) {
    this.productService.sortProducts(sortOrder).subscribe((data: any) => {
      this.products = data;
    });
    this.router.navigate(['/product-list']);
  }
  filterProduct(minPrice: number, maxPrice: number) {
    this.productService
      .filter_input(minPrice, maxPrice)
      .subscribe((data: any) => {
        this.products = data;
      });
    this.router.navigate(['/product-list']);
  }
  loadList() {
    this.productService.getProductListAPI().subscribe((list) => {
      this.products = list;
      // this.loadList();
    });
  }
  handleFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      const value = (event.target as HTMLInputElement).value;
      const filterValues = value.split('-');
      if (filterValues.length === 2) {
        const minPrice = Number(filterValues[0]);
        const maxPrice = Number(filterValues[1]);
        this.productService
          .filter_input(minPrice, maxPrice)
          .subscribe((data: any) => {
            this.products = data;
          });
      } else {
        this.productService.sortProducts(value).subscribe((data: any) => {
          this.products = data;
        });
      }
      this.router.navigate(['/product-list']);
    }
  }
}
