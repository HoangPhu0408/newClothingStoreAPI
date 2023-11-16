import { HttpClient } from '@angular/common/http';
import { Products } from './product.model';
import { Customer } from './customer.model';

export class FavoriteProduct {
  ProductId: number;
  CustomerId: number;
  ProductName: string;
  ProductPrice: number;

  constructor(prod: Products, cus: Customer) {
    this.ProductId = prod.productId;
    this.CustomerId = cus.userId;
    this.ProductName = prod.productName;
    this.ProductPrice = prod.officialPrice;
  }
}
