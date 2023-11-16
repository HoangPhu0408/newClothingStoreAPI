import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient) { }
    getCustomersAPI(): Observable<any>{
        return this.http.get<any>('https://localhost:7069/api/Customers');
    }
    getCustomerIdAPI(userId:number): any{
        return this.http.get('https://localhost:7069/api/Customers/' + userId.toString());
    }

    putCustomerAPI(userId: any, data: any) {
        return this.http.put('https://localhost:7069/api/Customers/' + userId.toString(), data);
    }
    postCustomerAPI(userData: any) {
        return this.http.post('https://localhost:7069/api/Customers/', userData);
    }
    deleteCustomerAPI(userId: any) {
        return this.http.delete('https://localhost:7069/api/Customers/' + userId.toString())
    }
}