import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }
  phone: string = ''
  pass: string = ''
  passcon: string = ''
  showError: boolean = false;

  checkPasswordLength() {
    if (this.pass.length < 8) {
      // Thực hiện các hành động bạn muốn nếu độ dài mật khẩu không đủ
      alert("Mật khẩu phải có ít nhất 8 ký tự.")
      console.log('');
    }
  }
  checkPasswordConLength() {
    if (this.passcon.length < 8) {
      // Thực hiện các hành động bạn muốn nếu độ dài mật khẩu không đủ
      alert("Mật khẩu phải có ít nhất 8 ký tự.")
      console.log('');
    }
  }
  checkPhoneLength() {
    if (this.phone.length < 10) {
      // Thực hiện các hành động bạn muốn nếu độ dài mật khẩu không đủ
      alert("Số điện thoại phải có ít nhất 10 ký tự.")
      console.log('');
    }
  }

  onSignUp(form: NgForm) {
    // if (this.pass.length < 8 || this.passcon.length < 8 || this.phone.length < 10) {

    // }
    // console.log("dc")
    const customer = {
      userName: form.value.userName.toString().trim(),
      phoneNumber: form.value.phoneNumber.toString().trim(),
      password: form.value.passWord.toString().trim()
    }
    if (customer.password.length < 8 || customer.phoneNumber < 10) {
      this.showError = true;
      console.log("d dc")
      console.log(customer.password.length)
      console.log(customer.phoneNumber)
      // console.log(this.phone)
      return
    } else {
      // this.phone = customer.phoneNumber
      // this.pass = customer.password

      this.authenticationService.Register(customer).subscribe(
        (response) => {
        },
        (error: any) => {
          console.log(error)
          alert("tài khoản đã tồn tại")
        }
      )
      this.router.navigate(['/login'])
    }
  }

}
