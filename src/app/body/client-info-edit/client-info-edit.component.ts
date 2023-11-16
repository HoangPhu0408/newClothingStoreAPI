import { ApplicationRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-info-edit',
  templateUrl: './client-info-edit.component.html',
  styleUrls: ['./client-info-edit.component.css'],
})
export class ClientInfoEditComponent implements OnInit {
  client: any;
  clientId: any;
  clientName: any;
  isChecked: boolean = false;
  phoneNumber: any;
  clientPassword: any;
  passwordField1: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private cusService: CustomerService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.clientId = this.authenticationService.getCurrentUser();
    this.cusService.getCustomerIdAPI(this.clientId).subscribe((data: any) => {
      this.client = data;
    });
  }

  EditInfo() {
    if (this.isChecked) {
      const info = {
        userId: this.client.userId,
        userName: this.client.userName.toString().trim(),
        password: this.client.password.toString().trim(),
        phoneNumber: this.client.phoneNumber.toString().trim(),
      };
      this.cusService
        .putCustomerAPI(Number(this.client.userId), info)
        .subscribe(() => {
          this.router.navigate(['/home']);
          this.clientName = this.client.userName;
          this.authenticationService.customerInfo = this.client;
          this.authenticationService.customerLoginState = true;
          this.authenticationService.customerStated.emit(
            this.authenticationService.customerLoginState
          );
          this.authenticationService.userLogin = this.clientName;
          this.authenticationService.userLoginEmitter.emit(
            this.authenticationService.userLogin
          );
        });
      console.log(info);
    } else {
      alert('Bạn cần xác nhận vào checkbox');
    }
  }
  handleCheckboxChange(event: any) {
    this.isChecked = event.target.checked;
  }
}
