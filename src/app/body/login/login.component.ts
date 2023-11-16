import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  phonenumber: string = '';
  errorMessage: string = '';
  name: string = '';
  pass: string = ''
  phone: string = ''

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) { }
  showError: boolean = false;

  ngOnInit(): void {
    this.authenticationService.LogOut();
  }
  onLogIn(form: NgForm) {
    const customer = {
      phonenumber: form.value.phonenumber.toString().trim(),
      password: form.value.password.toString().trim(),
    };

    if (customer.password.length < 8 || customer.phonenumber < 10) {
      this.showError = true;
      console.log("d dc")
      console.log(customer.password.length)
      console.log(customer.phonenumber.length)
      // console.log(this.phone)
      return
    } else {

      this.authenticationService.Login(customer).subscribe((response) => {
        if (response.message == 'Admin Status Success!') {
          this.router.navigate(['products']);
          this.phonenumber = response.userName;
          this.authenticationService.customerInfo = response;
          this.authenticationService.adminLoginState = true;
          this.authenticationService.adminStated.emit(
            this.authenticationService.adminLoginState
          );
          this.authenticationService.userLogin = this.phonenumber;
          this.authenticationService.userLoginEmitter.emit(
            this.authenticationService.userLogin
          );
        } else {
          this.router.navigate(['home']);
          this.phonenumber = response.phoneNumber;
          this.authenticationService.customerInfo = response;
          this.authenticationService.customerLoginState = true;
          this.authenticationService.customerStated.emit(
            this.authenticationService.customerLoginState
          );
          this.authenticationService.userLogin = this.phonenumber;
          this.authenticationService.userLoginEmitter.emit(
            this.authenticationService.userLogin
          );
        }
      });
    }
  }
}
