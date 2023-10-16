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

  onSignUp(form: NgForm) {
    const customer = {
      phoneNumber: form.value.phoneNumber.toString(),
      name: form.value.userName.toString().trim(),
      password: form.value.passWord.toString().trim()
    }

    this.authenticationService.Register(customer).subscribe()
    this.router.navigate(['/login'])
  }

}
