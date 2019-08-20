import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegisterModel} from '../models/user-register.model';
import {ENDPOINTS} from '../constants/api.constants';
import {map} from 'rxjs/operators';
import {TokenModel} from '../models/token.model';
import {BaseStorageService} from './base-storage.service';
import {LocalStorageKey} from '../constants/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn = false;

  constructor(private httpClient: HttpClient, private baseStorage: BaseStorageService) {
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    return this.httpClient.post<TokenModel>(ENDPOINTS.auth.login, {email, password})
      .pipe(map(user => {
        if (user && user.accessToken) {
          this.baseStorage.setStorage(LocalStorageKey.ACCESS_TOKEN, user.accessToken);
          this.loggedIn = true;
        }

        return user;
      }));
  }

  register(payload: UserRegisterModel) {
    return this.httpClient.post<UserRegisterModel>(ENDPOINTS.auth.register, payload);
  }

  logout(): void {
    this.baseStorage.clearStorageOf(LocalStorageKey.ACCESS_TOKEN);
  }
}
