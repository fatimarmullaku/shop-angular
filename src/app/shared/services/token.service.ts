import {Injectable} from '@angular/core';
import {BaseStorageService} from './base-storage.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper: JwtHelperService;

  constructor(private baseStorage: BaseStorageService) {
    this.jwtHelper = new JwtHelperService();
  }

  /*
  * TODO: Implement method/function that gets Token from local storage.
  */
  getToken(): string {
    return this.baseStorage.getStorageOf(LocalStorageKey.ACCESS_TOKEN, true);
  }

  // FIXME: Do not get token from local storage. Check if token exists in local storage.
  decodeToken(): any {
    const token = this.getToken();
    return token && token.length > 0 ? this.jwtHelper.decodeToken(token) : '';
  }

  isTokenExpired(): boolean | string {
    const token = this.baseStorage.getStorageOf(LocalStorageKey.ACCESS_TOKEN, true);
    if (token && token.length > 0) {
      return this.jwtHelper.isTokenExpired(token);
    }
    return 'Invalid token';
  }
}
