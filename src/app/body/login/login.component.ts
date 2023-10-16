import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = ''
  errorMessage: string = ''


  constructor(private router: Router, private authenticationService: AuthenticationService, private http: HttpClient) { }
  ngOnInit(): void {
    this.authenticationService.LogOut();
  }
  onLogIn(form: NgForm) {
    const customer = {
      userName: form.value.userName.toString().trim(),
      password: form.value.password.toString().trim()
    }

    this.authenticationService.Login(customer).subscribe(
      (response) => {
        if (response.message == 'Admin Status Success!') {
          this.router.navigate(['admin-sidebar'])
          this.name = response.userName;
          this.authenticationService.customerInfo = response;
          this.authenticationService.customerLoginState = true;
          this.authenticationService.customerStated.emit(this.authenticationService.customerLoginState);
          this.authenticationService.userLogin = this.name;
          this.authenticationService.userLoginEmitter.emit(this.authenticationService.userLogin);
        } else {
          this.router.navigate(['home'])
          this.name = response.userName;
          this.authenticationService.customerInfo = response;
          this.authenticationService.customerLoginState = true;
          this.authenticationService.customerStated.emit(this.authenticationService.customerLoginState);
          this.authenticationService.userLogin = this.name;
          this.authenticationService.userLoginEmitter.emit(this.authenticationService.userLogin);
        }
      }
    )
  }

}
