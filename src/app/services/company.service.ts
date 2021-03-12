import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../dataTypes/company';
import {environment} from '../../environments/environment';
import {Coupon} from '../dataTypes/coupon';
import {ClientService} from './ClientService';

@Injectable({
  providedIn: 'root'
})
export class CompanyService  implements ClientService{
  private companyAPIURL = environment.companyAPIURL;
  public name = 'Company';
  public tokenHeader = new HttpHeaders();

  constructor(private http: HttpClient) { }
  public login(email: string, password: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.companyAPIURL}/login/${email}/${password}`, { observe: 'response' });
  }

  public addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.companyAPIURL}/add`, coupon, {headers: this.tokenHeader});
  }

  public updateCoupon(coupon: Coupon): Observable<Coupon> {
    console.log(coupon);
    return this.http.put<Coupon>(`${this.companyAPIURL}/update`, coupon, {headers: this.tokenHeader});
  }

  public deleteCoupon(couponId: number): Observable<void> {
    return this.http.delete<void>(`${this.companyAPIURL}/delete/${couponId}`, {headers: this.tokenHeader});
  }

  public getCompanyCoupons(): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.companyAPIURL}/coupons`, {headers: this.tokenHeader});
  }

  public getCompanyCouponsByCategory(category: string): Observable<Array<Coupon>> {
    console.log(this.companyAPIURL + '     :company api url');
    return this.http.get<Array<Coupon>>(`${this.companyAPIURL}/coupons/category/${category}`, {headers: this.tokenHeader});
  }

  public getCompanyCouponsByMaxPrice(maxPrice: number): Observable<Array<Coupon>> {
    return this.http.get<Array<Coupon>>(`${this.companyAPIURL}/coupons/price/${maxPrice}`, {headers: this.tokenHeader});
  }

  public getCompanyDetails(): Observable<Company> {
    return this.http.get<Company>(`${this.companyAPIURL}`, {headers: this.tokenHeader});
  }

  public setHeader(key: string, value: string): void {
    let headers = new HttpHeaders();
    headers = headers.set(key, value);
    this.tokenHeader = headers;
  }


}
