import { Component, OnInit } from '@angular/core';
import {RestService} from '../../shared/services/rest.service';
import {BaseStorageService} from '../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../shared/constants/local-storage-key';
import {HttpRequestMethod} from '../../shared/constants/http-request.method';
import {ENDPOINTS} from '../../shared/constants/api.constants';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerModel} from '../../shared/models/customer.model';
import {CustomerService} from '../../shared/services/customer.service';
import {AddressModel} from '../../shared/models/address.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  username: string;
  customer: CustomerModel;

  constructor(private restService: RestService,
              private baseStorageService: BaseStorageService) { }

  ngOnInit() {
    this.fetchUser();
  }
  fetchUser(): void {
    const customerId = this.baseStorageService.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    this.restService.request<any>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll + `/${customerId}`).subscribe((res) => {
        this.username = res.name;
        this.customer = res;
      },
      (err) => {
        console.log(err);
      });
  }

}
