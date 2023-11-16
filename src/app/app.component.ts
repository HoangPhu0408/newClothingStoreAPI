import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-complete';
  adminLogin: boolean = false
  customerLogin:any
  constructor(private authen: AuthenticationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.route.paramMap.subscribe()
    this.authen.adminStated.subscribe((event) => {
      this.adminLogin = event
    })
    // this.adminLogin = this.authen.adminLoginState
    // this.customerLogin =this.authen.customerLoginState
  }
  
}