import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocalStorageKey} from '../constants/local-storage-key';
import {BaseStorageService} from './base-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly baseUrl = environment.apiHost;


  constructor(private http: HttpClient,
              private baseStorage: BaseStorageService) {

  }

  paged(size: number, page: number) {
    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    const params = new HttpParams().set('size', String(size)).set('page', String(page)).set('customerId', `${customerId}`);
    return this.http.get(this.baseUrl + '/orders/history/paged', {params});
  }


}
