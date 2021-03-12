import {Observable} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

export interface ClientService {
  name: string;
  tokenHeader: HttpHeaders;
  login(email: string, password: string): Observable<HttpResponse<boolean>>;
  setHeader(key: string, value: string): void;
}
