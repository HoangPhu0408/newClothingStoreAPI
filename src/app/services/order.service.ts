import { Injectable } from '@angular/core';
import { Order } from '../model/orders.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from '../model/orderdetail.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  lstOrder: Order[] = [];
  // lstCustomer: Customer[] = []
  constructor(private http: HttpClient) {}

  getOrderListAPI(): Observable<Order[]> {
    return this.http.get<Order[]>('https://localhost:7069/api/Orders');
  }
  getOrderIdAPI(id: number): Observable<any> {
    return this.http.get<any>(
      'https://localhost:7069/api/OrderDetail/' + id.toString()
    );
  }
  getOrderIdAPICore(id: number): Observable<any> {
    return this.http.get<any>(
      'https://localhost:7069/api/Orders/' + id.toString()
    );
  }
  getOrderDetailByOrderAPI(id: number): Observable<any> {
    return this.http.get<any>(
      'https://localhost:7069/api/OrderDetails/order/' + id.toString() 
    );
  }
  putOrderConfirmAPI(id: number) {
    return this.http.put(
      'https://localhost:7069/api/Orders/confirm/' + id.toString(),
      null
    );
  }
  putOrderCancelAPI(id: number): any {
    return this.http.put(
      'https://localhost:7069/api/Orders/cancel/' + id.toString(),
      null
    );
  }
  getOrdersByDateRange(startDate: string, endDate: string) {
    return this.http.get(
      `https://localhost:7069/api/Orders/getDate?startDate=${startDate}&endDate=${endDate}`
    );
  }
  getOrderDetailListAPI(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(
      'https://localhost:7069/api/OrderDetails'
    );
  }
  getOrdersByUserId(id: number): any {
    return this.http.get(
      'https://localhost:7069/api/Orders/user/' + id.toString()
    );
  }

  // putCategoryAPI(id: number, data: any) {
  //   return this.http.put('https://localhost:7069/api/Categories/' + id.toString(), data);
  // }
}
