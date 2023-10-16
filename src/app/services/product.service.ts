import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProductListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Products');
  }
  getProductIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Products/' + id.toString());
  }
  postProductAPI(dataProd: any) {
    return this.http.post('https://localhost:7069/api/Products', dataProd)
  }
  putProductAPI(idProd: number, data: any) {
    return this.http.put('https://localhost:7069/api/Products/' + idProd.toString(), data);
  }
  deleteProductAPI(idProduct: number) {
    return this.http.delete('https://localhost:7069/api/Products/' + idProduct.toString());
  }
  getProductByCate(id: number): Observable<[]>{
    return this.http.get<[]>('https://localhost:7069/api/Categories/category/' + id.toString());
  }
  getFavoriteProductAPI(idCus: number): any {
    return this.http.get('https://localhost:7069/api/Products/idFavor=' + idCus.toString);
  }

  getProdBySearchKeyAPI(searchKey: string): Observable<Products[]> {
        return this.http.get<Products[]>('https://localhost:7069/api/Products/searchKey='+searchKey);
    }

  getCategoryListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Categories');
  }
  getCategoryIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Categories/' + id.toString());
  }
  postCategory(data: any){
    return this.http.post('https://localhost:7069/api/Categories', data)
  }
  putCategoryAPI(id: number, data: any) {
    return this.http.put('https://localhost:7069/api/Categories/' + id.toString(), data);
  }
  deleteCategoryAPI(id: number) {
    return this.http.delete('https://localhost:7069/api/Categories/' + id.toString());
  }
}
