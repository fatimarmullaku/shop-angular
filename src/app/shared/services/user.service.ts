import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegisterModel} from '../models/user-register.model';
import {ENDPOINTS} from '../constants/api.constants';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: UserModel;



  loggedIn = false;

  constructor(private httpClient: HttpClient, private localStorage: StorageService) {
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(ENDPOINTS.auth.login, {email, password})
      .pipe(map(user => {
        if (user && user.accessToken) {
          this.localStorage.set('accessToken', user.accessToken);
          this.loggedIn = true;
        }
        if (user.customerId) {
          this.localStorage.set('customerId', user.customerId);
        }

        return user;
      }));
  }

  register(payload: UserRegisterModel) {
    return this.httpClient.post<UserRegisterModel>(ENDPOINTS.auth.register, payload);
  }

  logout(): void {
    this.localStorage.delete('accessToken');
  }
}
