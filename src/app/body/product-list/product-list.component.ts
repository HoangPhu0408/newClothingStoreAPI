import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: any;
  selectedSortOption: string = 'default';
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productList = this.productService.getProductListAPI();
  }
  // onSortOptionChange(): void {
  //   if (this.selectedSortOption === 'lowToHigh') {
  //     this.productList.sort((a, b) => a.price - b.price);
  //   }
  //   else if (this.selectedSortOption === 'HighToLow') {
  //     this.productList.sort((a, b) => b.price - a.price);

  //   } else {
  //     this.productList.sort((a, b) => a.id - b.id);
  //   }

  // }
}
