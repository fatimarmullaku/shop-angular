import {Injectable} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {BaseStorageService} from './base-storage.service';
import {PhoneNumberModel} from '../models/phoneNumber.model';
import {AddressModel} from '../models/address.model';
import {RestService} from './rest.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {HttpRequestMethod} from '../constants/http-request.method';
import {ENDPOINTS} from '../constants/api.constants';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: CustomerModel [];

  constructor(private baseStorage: BaseStorageService, private restService: RestService) {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    const customer1 = new CustomerModel();
    customer1.id = 1;
    customer1.firstName = 'John';
    customer1.lastName = 'Doe';

    const firstPhoneNumber = new PhoneNumberModel();
    const secPhoneNumber = new PhoneNumberModel();

    firstPhoneNumber.home = '+38342655';
    firstPhoneNumber.mobile = '+24896226';
    secPhoneNumber.home = '+38344458485';
    secPhoneNumber.mobile = '+37744258852';
    customer1.phoneNumbers = [firstPhoneNumber, secPhoneNumber];

    const firstAddress = new AddressModel();

    firstAddress.country = 'Kosovo';
    firstAddress.city = 'Prishtine';
    firstAddress.zipCode = 10000;
    firstAddress.street = 'Bajram Kelmendi';

    const secAddress = new AddressModel();

    secAddress.country = 'shqiperi';
    secAddress.city = 'tirana';
    secAddress.zipCode = 10000;
    secAddress.street = 'rruga b';
    customer1.addresses = [firstAddress, secAddress];

    this.customers = [customer1];
  }

  getCustomers(): CustomerModel[] {
    return this.customers;
  }

  getCustomer(id: number): CustomerModel {
    const customers = this.customers.filter(item => item.id == id);
    if (customers) {
      const customer = customers[0];
      return customer;
    }

    return null;
  }

  getCustomerFromServer() {
    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    return this.restService.publicRequest(HttpRequestMethod.GET, ENDPOINTS.customers.getById + `/${customerId}`)
      .pipe(map(user => {
        return user;
      }));
  }
}
