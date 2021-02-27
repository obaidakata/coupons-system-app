import { Component, OnInit } from '@angular/core';
import {Coupon} from '../dataTypes/coupon';
import {AdminService} from '../services/admin.service';
import {CompanyService} from '../services/company.service';
import {Company} from '../dataTypes/company';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';


enum Category {
  Food,
  Electricity,
  Restaurant,
  Vacation
}


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public companyCoupons: Coupon[];
  public editCoupon: Coupon | null;
  public deleteCoupon: Coupon | null;
  public companyDetails: Company | null;
  public categories: string[];
  constructor(private companyService: CompanyService) {
    this.companyCoupons = [];
    this.editCoupon = null;
    this.deleteCoupon = null;
    this.companyDetails = null;
    this.categories = Object.keys(Category);
  }

  ngOnInit(): void {
    this.getCompanyDetails();
    this.getCompanyCoupons();
  }
  private getCompanyDetails(): void {
    this.companyService.getCompanyDetails().subscribe(
      (response: Company) => {
        this.companyDetails = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message + 'getCompanyDetails');
      }
    );
  }
  private getCompanyCoupons(): void {
    this.companyService.getCompanyCoupons().subscribe(
      (response: Coupon[]) => {
        this.companyCoupons = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message + 'getCompanyCoupons');
      }
    );
  }

  public onOpenModalCompanie(coupon: Coupon | null, mode: string): void {
    const couponContainer = document.getElementById('coupon-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCouponModal');
    }
    else if (mode === 'edit') {
      this.editCoupon = coupon;
      button.setAttribute('data-target', '#updateCouponModal');
    }
    else if (mode === 'delete') {
      this.deleteCoupon = coupon;
      button.setAttribute('data-target', '#deleteCouponModal');
    }

    couponContainer?.appendChild(button);
    button.click();
  }
  public onAddCoupon(addForm: NgForm): void{
    document.getElementById('add-coupon-form')?.click();
    // const category = addForm.value.
    const coupon: Coupon = addForm.value;
    coupon.startDate = new Date();
    coupon.endDate = new Date('2022-01-16');
    console.log('onAddCoupon');
    console.log(coupon);
    this.companyService.addCoupon(coupon).subscribe(
      (response: Coupon) => {
        console.log(response);
        this.getCompanyCoupons();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
  );
  }

  public onOpenModalCoupon(coupon: Coupon | null, mode: string): void {
    const companyContainer = document.getElementById('coupon-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCouponModal');
    }
    else if (mode === 'edit') {
      this.editCoupon = coupon;
      button.setAttribute('data-target', '#updateCouponModal');
    }
    else if (mode === 'delete') {
      this.deleteCoupon = coupon;
      button.setAttribute('data-target', '#deleteCouponModal');
    }

    companyContainer?.appendChild(button);
    button.click();
  }
  public onUpdateCoupon(coupon: Coupon): void {
    if (this.editCoupon !== undefined && this.editCoupon !== null && this.companyDetails != null) {
      coupon.companiesID = this.companyDetails.id;
      coupon.id = this.editCoupon.id;
      coupon.startDate = new Date();
      coupon.endDate = new Date('2022-01-16');
      this.companyService.updateCoupon(coupon).subscribe(
        (response: Coupon) => {
          console.log(response);
          this.getCompanyCoupons();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  public onDeleteCoupon(couponId: number| undefined): void{
    console.log(couponId);
    if (couponId !== undefined)
    {
      this.companyService.deleteCoupon(couponId).subscribe(
        (response: void) => {
          console.log(response);
          this.getCompanyCoupons();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
}
