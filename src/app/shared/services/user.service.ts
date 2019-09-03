import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegisterModel} from '../models/user-register.model';
import {ENDPOINTS} from '../constants/api.constants';
import {BaseStorageService} from './base-storage.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {RestService} from './rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn = false;

  constructor(private httpClient: HttpClient,
              private restService: RestService,
              private baseStorage: BaseStorageService,
              private router: Router,
              private tokenService: TokenService) {
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    return this.restService.publicRequest<any>(HttpRequestMethod.POST, ENDPOINTS.auth.login, {
      body: {
        email,
        password
      }
    }).pipe(map(user => {
        if (user) {
          if (user.accessToken) {
            this.baseStorage.setStorage(LocalStorageKey.ACCESS_TOKEN, user.accessToken, true);
            console.log(this.tokenService.decodeToken());
          }
          if (user.customerId) {
            console.log(user.customerId);
            this.baseStorage.setStorage(LocalStorageKey.CUSTOMER_ID, user.customerId, true);
          }
        }

        return user;
      }));
  }

  register(payload: UserRegisterModel) {
    return this.httpClient.post<UserRegisterModel>(ENDPOINTS.auth.register, payload);
  }

  logout(): void {
    this.baseStorage.clearStorageOf(LocalStorageKey.ACCESS_TOKEN);
    this.baseStorage.clearStorageOf(LocalStorageKey.CUSTOMER_ID);
    this.baseStorage.clearStorageOf(LocalStorageKey.TEMP_SHIPPING_KEY);
    this.router.navigateByUrl('/auth/login');
  }

  addPhonesAndAddresses(payload: any) {
    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    return this.restService.request<any>(HttpRequestMethod.PUT,
      ENDPOINTS.customers.updatePhonesAndAddresses + `/${customerId}`,
      {
      body: payload
    });
  }

  getRole(): string {
    return this.tokenService.decodeToken().role;
  }
}
