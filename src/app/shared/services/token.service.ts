import {Injectable} from '@angular/core';
import {BaseStorageService} from './base-storage.service';
import {LocalStorageKey} from '../constants/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private baseStorage: BaseStorageService) {
  }

  /*
  * TODO: Implement method/function that gets Token from local storage.
  */
  getToken(): string {
    return this.baseStorage.getStorageOf(LocalStorageKey.ACCESS_TOKEN);
  }

}
