import {Injectable} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {StorageService} from './storage.service';
import {BaseStorageService} from './base-storage.service';
import {RestService} from './rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {ENDPOINTS} from '../constants/api.constants';

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
}
