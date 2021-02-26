import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AdminService} from '../services/admin.service';
import {CompanyService} from '../services/company.service';
import {CustomerService} from '../services/customer.service';
import {Company} from '../dataTypes/company';
import {HttpErrorResponse} from '@angular/common/http';
import {ClientService} from '../services/ClientService';
import {AppComponent} from '../app.component';

enum ClientType
{
  Administrator,
  Company,
  Customer
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public currentClientType = ClientType.Customer;
  public services: ClientService[] ;

  constructor(private adminService: AdminService,
              private companyService: CompanyService,
              private customerService: CustomerService,
              private app: AppComponent) {
    this.services = [adminService, companyService, customerService];
  }

  ngOnInit(): void {
  }
  public login(loginForm: NgForm): void
  {
    const formValue = loginForm.value;
    const email = formValue.email;
    const password = formValue.password;
    const loginType = Number(formValue.loginType);
    const service = this.services[loginType];
    service?.login(email, password).subscribe(
      (response: boolean) => {
        console.log(response);
        if (!response){
            alert('Password or Email wrong!');
        }
        else {
          this.app.onSuccessfulLogin(service.name);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
// CUSTOMER4
// company2@gmail.com
