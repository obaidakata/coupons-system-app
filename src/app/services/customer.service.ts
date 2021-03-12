import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coupon} from '../dataTypes/coupon';
import {Customer} from '../dataTypes/customer';
import {environment} from '../../environments/environment';
import {ClientService} from './ClientService';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements ClientService{
  private customerAPIURL = environment.customerAPIURL;
  public name = 'Customer';
  public tokenHeader = new HttpHeaders();
  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.customerAPIURL}/login/${email}/${password}`, { observe: 'response' });
  }

  public purchaseCoupon(couponId: number): Observable<void> {
    return this.http.post<void>(`${this.customerAPIURL}/add/`, couponId, {headers: this.tokenHeader});
  }

  public getCustomerCoupons(): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.customerAPIURL}/coupons`, {headers: this.tokenHeader});
  }

  public getCustomerCouponsByCategory(category: string): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.customerAPIURL}/coupons/category/${category}`, {headers: this.tokenHeader});
  }

  public getCustomerCouponsByMaxPrice(maxPrice: number): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.customerAPIURL}/coupons/price/${maxPrice}`, {headers: this.tokenHeader});
  }

  public getCustomerDetails(): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerAPIURL}`, {headers: this.tokenHeader});
  }

  public getAllCoupons(): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.customerAPIURL}/AllCompanies`, {headers: this.tokenHeader});
  }

  public getAllCouponsByCategory(category: string): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.customerAPIURL}/AllCompanies/${category}`, {headers: this.tokenHeader});
  }

  public getAllCouponsByMaxPrice(maxPrice: number): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.customerAPIURL}/AllCoupons/price/${maxPrice}`, {headers: this.tokenHeader});
  }

  public setHeader(key: string, value: string): void {
    let headers = new HttpHeaders();
    headers = headers.set(key, value);
    this.tokenHeader = headers;
  }
}
