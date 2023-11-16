// favorite-product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteProduct } from '../model/favorite-product';
import { Products } from '../model/product.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProductService {
  favoriteItem: FavoriteProduct[] = [];
  private apiUrl = 'https://localhost:7069/api/FavoriteProduct'; // Đường dẫn đến API

  constructor(private http: HttpClient) {}

  getFavoritesByUserId(userId: number): Observable<FavoriteProduct[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<FavoriteProduct[]>(url);
  }
  getFavoriteItem(userId: number): FavoriteProduct[] {
    return this.favoriteItem;
  }

  addToFavorites(data: any): Observable<any> {
    // const product = this.favoriteItem.find(
    //   item => item.ProductId == prod.productId);
    // const uId = this.favoriteItem.find(item => item.CustomerId == userId.userId);
    return this.http.post<any>(this.apiUrl, data);
  }

  removeFromFavorites(favoriteId: number): Observable<any> {
    const url = `${this.apiUrl}/${favoriteId}`;
    return this.http.delete(url);
  }
}
