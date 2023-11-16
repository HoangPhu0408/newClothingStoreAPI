import { ApplicationRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomerService } from 'src/app/services/customers.service';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { data } from 'jquery';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css'],
})
export class ClientOrderComponent implements OnInit {
  clientId: any;
  orders: any;
  orderDetailsId: any;
  client: any;
  orderid: any;
  idProd: any;
  productID: any;

  constructor(
    private authenticationService: AuthenticationService,
    private cusService: CustomerService,
    private orderService: OrderService,
    private prodService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.clientId = this.authenticationService.getCurrentUser();
    this.cusService.getCustomerIdAPI(this.clientId).subscribe((data: any) => {
      this.client = data;
    })
    this.orderService
      .getOrdersByUserId(this.clientId)
      .subscribe((order: any) => {
        this.orders = order.reverse();
      });
    // this.cusService.getCustomerIdAPI(this.clientId).subscribe((data: any) => {
    //   this.client = data;
    // });
  }
}
