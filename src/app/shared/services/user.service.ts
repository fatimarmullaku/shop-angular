import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegisterModel} from '../models/user-register.model';
import {ENDPOINTS} from '../constants/api.constants';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
          this.localStorage.set('accessToken', JSON.stringify(user.accessToken.valueOf()));
          this.loggedIn = true;
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
