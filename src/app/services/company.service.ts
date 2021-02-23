import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../dataTypes/company';
import {environment} from '../../environments/environment';
import {Customer} from '../dataTypes/customer';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiServerUrl = ''; //environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


}
