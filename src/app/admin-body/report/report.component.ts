import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
declare var Chart: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  chart: any;

  orderList: any;
  orderListLength: number = 0;

  orderPrice: number = 0;
  orderProduct: number = 0;

  cusList: any[] = [];
  cusListLength: number = 0;

  productSales: { name: string, quantity: number }[] = [];

  orderDetailList: any[] = [];
  orderDetailListLength: number = 0;




  constructor(private orderService: OrderService, private authen: AuthenticationService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderService.getOrderListAPI().subscribe(list => {
      this.orderList = list;
      this.orderListLength = this.orderList.length;
    });

    this.orderService.getOrderListAPI().subscribe(orders => {
      this.orderPrice = this.calculateTotalRevenue(orders);
    });

    this.authen.getCustomerListAPI().subscribe(cus => {
      this.cusList = cus;
      this.cusListLength = this.cusList.length;
    })

    this.orderService. getOrderDetailListAPI().subscribe(total => {
      this.orderProduct = this.calculateTotalProduct(total);

    });
  }

  calculateTotalProduct(orderDetails: any[]): number {
    let total = 0;
    for (let order of orderDetails) { 
      total += order.quantity; 
    }
    return total;
  }


  calculateTotalRevenue(orders: any[]): number {
    let total = 0;
    for (let order of orders) { 
      total += order.orderPrice; 
    }
    return total;
  }



    
  }

