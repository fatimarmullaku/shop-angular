import {Injectable} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {StorageService} from './storage.service';
import {BaseStorageService} from './base-storage.service';
import {PhoneNumberModel} from '../models/phoneNumber.model';
import {AddressModel} from '../models/address.model';
import {RestService} from './rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {ENDPOINTS} from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: CustomerModel [];

  constructor(private storageService: StorageService,
              private baseStorage: BaseStorageService,
              private restService: RestService) {
    this.fetchCustomerById(1);
    // this.fetchCustomers();
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

    const secondAddres = new AddressModel();

    secondAddres.country = 'Kosovo';
    secondAddres.city = 'Prishtine';
    secondAddres.zipCode = 10000;
    secondAddres.street = 'Bajram Kelmendi';

    const tha = new AddressModel();

    tha.country = 'Kosovo';
    tha.city = 'Prishtine';
    tha.zipCode = 10000;
    tha.street = 'Bajram Kelmendi';
    // const secAddress = new AddressModel();
    //
    // secAddress.country = 'shqiperi';
    // secAddress.city = 'tirana';
    // secAddress.zipCode = 10000;
    // secAddress.street = 'rruga b';
    customer1.addresses = [firstAddress, secondAddres, tha];

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

  fetchCustomerById(customerId: number) {
    this.restService.publicRequest<CustomerModel>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll + '/' + this.baseStorage.getStorageOf('customerId', true))
      .subscribe(customerModel => this.customers = [customerModel]);
  }
}
