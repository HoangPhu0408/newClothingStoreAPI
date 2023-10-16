import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  lstProduct:any;
  constructor(private productService : ProductService){}
  ngOnInit(): void {
    this.productService.getProductListAPI().subscribe(lstProd => 
        this.lstProduct = lstProd.reverse()
      )
  }
}
