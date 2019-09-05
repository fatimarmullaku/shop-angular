import {Injectable} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {StorageService} from './storage.service';
import {BaseStorageService} from './base-storage.service';
import {RestService} from './rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {LocalStorageKey} from '../constants/local-storage-key';
import {ENDPOINTS} from '../constants/api.constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: CustomerModel [] = [];

  constructor(private storageService: StorageService,
              private baseStorage: BaseStorageService,
              private restService: RestService) {
  }

  getCustomers(): CustomerModel[] {
    return this.customers;
  }

  getCustomer(): Observable<CustomerModel> {
    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    return this.restService.request<CustomerModel>(HttpRequestMethod.GET, ENDPOINTS.customers.getById + `/${customerId}`);
  }

  // updateCustomer(payload: any) {
  //   const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
  //   console.log(this.restService.publicRequest<any>(HttpRequestMethod.PUT, ENDPOINTS.customers.update + `/${customerId}`, {
  //     body: payload
  //   }));
  //   return this.restService.publicRequest<any>(HttpRequestMethod.PUT, ENDPOINTS.customers.update + `/${customerId}`, {
  //     body: payload
  //   });
  // }
}
