import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../dataTypes/company';
import {environment} from '../../environments/environment';
import {Customer} from '../dataTypes/customer';
import {Coupon} from '../dataTypes/coupon';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyAPIURL = ''; //environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public login(email: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.companyAPIURL}/${email}/${password}`);
  }

  public addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.companyAPIURL}/add`, coupon);
  }

  public updateCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(`${this.companyAPIURL}/update`, coupon);
  }

  public deleteCoupon(couponId: number): Observable<void> {
    return this.http.delete<void>(`${this.companyAPIURL}/delete/${couponId}`);
  }

  public getCompanyCoupons(): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.companyAPIURL}/coupons`);
  }

  public getCompanyCouponsByCategory(category: eCategory): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.companyAPIURL}/coupons/${category}`);
  }

  public getCompanyCouponsByMaxPrice(maxPrice: number): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.companyAPIURL}/coupons/${maxPrice}`);
  }

  public getCompanyDetails(): Observable<Company> {
    return this.http.get<Company>(`${this.companyAPIURL}`);
  }
}
