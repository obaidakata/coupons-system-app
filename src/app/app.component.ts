import {Component, OnInit} from '@angular/core';
import {CompanyService} from './services/company.service';
import {AdminService} from './services/admin.service';
import {Company} from './dataTypes/company';
import {HttpErrorResponse} from '@angular/common/http';
import {element} from 'protractor';
import {NgForm} from '@angular/forms';
import {Console} from 'inspector';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public showLogin = true;
  public showAdmin = false;
  public showCompany = false;
  public showCustomer = false;
  ngOnInit(): void {
  }

  public onSuccessfulLogin(componentName: string): void
  {
    this.showLogin = !this.showLogin;
    if (componentName === 'Admin') {
      this.showAdmin = !this.showAdmin;
    }
    else if (componentName === 'Company')
    {
      this.showCompany = !this.showCompany;
    }
    else if (componentName === 'Customer')
    {
      this.showCustomer = !this.showCustomer;
    }
  }
  public onLogOut(): void
  {
    this.showLogin = true;

    this.showAdmin = this.showCompany = this.showCustomer = false;
  }
}
