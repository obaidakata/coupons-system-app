import { Component, OnInit } from '@angular/core';
import {Coupon} from '../dataTypes/coupon';
import {Company} from '../dataTypes/company';
import {CompanyService} from '../services/company.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../dataTypes/customer';
import {eCustomerIndexPage} from '../models/eCustomerIndexPage';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {
  public customerCoupons: Coupon[];
  public customerDetails: Customer | null;
  public purchaseCoupon: Coupon | null;
  public companyCoupons: Coupon[];
  public currentCategory = '';
  public ePageIndex;

  constructor(private customerService: CustomerService) {
    this.customerCoupons = [];
    this.companyCoupons = [];
    this.customerDetails = null;
    this.purchaseCoupon = null;
    this.ePageIndex = eCustomerIndexPage.showCompaniesCoupons;
  }

  ngOnInit(): void {
    this.getCustomerDetails();
    this.getCustomerCoupons();
    this.getAllCoupons();
  }

  public isThisPageOnScreen(input: string): boolean {
    return input === this.ePageIndex.toString();
  }

  public applyCategoryFilter(): void{
    if (this.currentCategory !== undefined) {
      console.log(this.currentCategory + ' currentCategory');

      if (this.ePageIndex === eCustomerIndexPage.showCompaniesCoupons ) {
        console.log(this.ePageIndex + ' ? ' + eCustomerIndexPage.showCompaniesCoupons);
        this.customerService.getAllCouponsByCategory(this.currentCategory).subscribe(
          (response: Coupon[]) => {
            this.companyCoupons = response;
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            alert(error.message + ' getCustomerCoupons');
          }
        );
      }
      else {
        this.customerService.getCustomerCouponsByCategory(this.currentCategory).subscribe(
          (response: Coupon[]) => {
            this.customerCoupons = response;
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            alert(error.message + ' getCustomerCoupons');
          }
        );
      }
    }
  }
  public categoryChanged(category: string): void {
    this.currentCategory = category;
  }
  private getAllCoupons(): void {
    this.customerService.getAllCoupons().subscribe(
      (response: Coupon[]) => {
        this.companyCoupons = response.sort((one, two) => (one.title > two.title ? -1 : 1));
        console.log('getAllCoupons');
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message + 'getCustomerDetails');
      }
    );
  }
  private getCustomerDetails(): void {
    this.customerService.getCustomerDetails().subscribe(
      (response: Customer) => {
        this.customerDetails = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message + 'getCustomerDetails');
      }
    );
  }
  private getCustomerCoupons(): void {
    this.customerService.getCustomerCoupons().subscribe(
      (response: Coupon[]) => {
        this.customerCoupons = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message + 'getCustomerCoupons');
      }
    );
  }
  public onOpenModalCoupon(coupon: Coupon | null, mode: string): void {
    const customerContainer = document.getElementById('coupon-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#purchaseCouponModal');
    }

    customerContainer?.appendChild(button);
    button.click();
  }
  public onPurchaseCoupon(couponId: number| undefined): void{
    console.log(couponId);
    const isPurchasedBefore = this.customerCoupons.find(value => value.id === couponId);
    if (!isPurchasedBefore ) {
      if (couponId !== undefined) {
        this.customerService.purchaseCoupon(couponId).subscribe(
          (response: void) => {
            this.getAllCoupons();
            this.getCustomerCoupons();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    }
    else {
      alert('Coupon purchased before');
    }
  }
  public onSwitchData(collection: string): void
  {
    console.log(collection);
    if (collection === 'Companies')
    {
      this.ePageIndex = eCustomerIndexPage.showCompaniesCoupons;

    }
    else if (collection === 'My')
    {
      this.ePageIndex = eCustomerIndexPage.showMyCoupons;
    }

  }


}
