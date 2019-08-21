import {Injectable} from '@angular/core';
import {BaseStorageService} from './base-storage.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private baseStorage: BaseStorageService, private jwtHelper: JwtHelperService) {
  }

  /*
  * TODO: Implement method/function that gets Token from local storage.
  */
  getToken(): string {
    return this.baseStorage.getStorageOf(LocalStorageKey.ACCESS_TOKEN);
  }

  // FIXME: Do not get token from local storage. Check if token exists in local storage.
  decodeToken(): any {
    return this.jwtHelper.decodeToken(this.getToken());
  }
}
