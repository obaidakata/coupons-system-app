import {Observable} from 'rxjs';

export interface ClientService {
  name: string;
  login(email: string, password: string): Observable<boolean>;
}
