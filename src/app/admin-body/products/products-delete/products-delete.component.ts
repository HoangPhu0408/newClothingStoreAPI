import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-delete',
  templateUrl: './products-delete.component.html',
  styleUrls: ['./products-delete.component.css']
})
export class ProductsDeleteComponent implements OnInit {
  productID: any;
  product: any;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productID = Number(this.route.snapshot.paramMap.get('id'));

      this.productService.getProductIdAPI(this.productID).subscribe((prod: any) =>
        this.product = prod
      )

    })
  }

  DeleteProduct() {
    this.productService.deleteProductAPI(this.productID).subscribe()
    this.router.navigate(['/products'])
  }
}
