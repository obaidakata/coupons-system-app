import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../dataTypes/company';
import {environment} from '../../environments/environment';
import {Customer} from '../dataTypes/customer';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiServerUrl = ''; // environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.apiServerUrl}/admin/company/add`, company);
  }

  public updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiServerUrl}/admin/company/update`, company);
  }

  public deleteCompany(companyID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/admin/company/delete/${companyID}`);
  }

  public getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiServerUrl}/admin/company/all`);
  }

  public getOneCompanies(companyID: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiServerUrl}/admin/company/find/${companyID}`);
  }

  //    -------------------- customer ------------------------------

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiServerUrl}/admin/customer/add`, customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiServerUrl}/admin/customer/update`, customer);
  }

  public deleteCustomer(customerID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/admin/customer/delete/${customerID}`);
  }

  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiServerUrl}/admin/customer/all`);
  }

  public getOneCustomer(customerID: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiServerUrl}/admin/customer/find/${customerID}`);
  }
}
