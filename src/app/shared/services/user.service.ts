import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserRegisterModel} from '../models/user-register.model';
import {ENDPOINTS} from '../constants/api.constants';
import {BaseStorageService} from './base-storage.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {RestService} from './rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn = false;

  constructor(private httpClient: HttpClient, private restService: RestService, private baseStorage: BaseStorageService) {
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    return this.restService.publicRequest(HttpRequestMethod.POST, ENDPOINTS.auth.login, {
      body: {
        email,
        password
      }
    }).pipe(map(user => {
        if (user && user.accessToken) {
          this.baseStorage.setStorage(LocalStorageKey.ACCESS_TOKEN, user.accessToken, true);
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
