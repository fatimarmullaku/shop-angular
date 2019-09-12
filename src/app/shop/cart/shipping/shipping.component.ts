import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CustomerModel} from '../../../shared/models/customer.model';
import {AddressModel} from '../../../shared/models/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpRequestMethod} from '../../../shared/constants/http-request.method';
import {ENDPOINTS} from '../../../shared/constants/api.constants';
import {RestService} from '../../../shared/services/rest.service';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html'
})
export class ShippingComponent implements OnInit {
  shippingFormGroup: FormGroup;
  customer: CustomerModel;
  customerAddresses: AddressModel[];
  addresses: FormArray;
  clicked = false;
  nextClicked = true;
  selectedAddress: any;
  customerEmail: string;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private restService: RestService,
              private activatedRoute: ActivatedRoute,
              private baseStorage: BaseStorageService
  ) {
  }

  ngOnInit() {
    this.fetchCustomer();
    this.fetchEmail();
    this.shippingFormGroup = new FormGroup({
      addresses: new FormArray([])
    });
  }

  fetchCustomer(): void {
    this.restService.request<any>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll)
      .subscribe((res) => {
          const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
          const tempId = +customerId;
          this.customer = res.filter(item => item.id === tempId)[0];
          this.loadAdressesView();
        },
        error => {
          console.error(error);
        });
  }

  fetchEmail(): void {
    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    this.restService.request<any>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll + `/${customerId}`).subscribe((res) => {
        this.customerEmail = res.email;
      },
      (err) => {
        console.log(err);
      });
  }

  createAddress(index?: number): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(this.customer.addresses[index].id),
      country: new FormControl(this.customer.addresses[index].country),
      city: new FormControl(this.customer.addresses[index].city),
      zipCode: new FormControl(this.customer.addresses[index].zipCode),
      street: new FormControl(this.customer.addresses[index].street)
    });
  }
  createEmptyAddress(): FormGroup {
    return this.formBuilder.group({
      country: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl(''),
      street: new FormControl('')
    });
  }

  onAddAddress(event: any) {
    event.preventDefault();
    this.addresses = this.shippingFormGroup.get('addresses') as FormArray;
    this.addresses.push(this.createEmptyAddress());
  }

  newCustomerAddress(address: any) {
    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID);
    const payload = {
      addresses: [
        address
      ]
    };
    return this.restService.request<any>(HttpRequestMethod.PUT, ENDPOINTS.customers.getAll + `/${customerId}`, {
      body: payload
    });
  }

  getLastAddressRequest() {
    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID);
    const url = ENDPOINTS.customers.getAll + `/${customerId}/last-address`;
    return this.restService.request<any>(HttpRequestMethod.GET, url);
  }

  onSubmit(event: any) {
    // event.preventDefault();
    // let address: any;
    // if (this.selectedAddress.id) {
    //   address = {
    //     id: this.selectedAddress.id
    //   };
    // } else {
    //   address = {
    //     country: this.selectedAddress.country,
    //     city: this.selectedAddress.city,
    //     zipCode: this.selectedAddress.zipCode,
    //     street: this.selectedAddress.street
    //   };
    // }
    // if (!address.id) {
    //   this.newCustomerAddress(address).subscribe(res => {
    //       this.getLastAddressRequest().subscribe((result) => {
    //           this.baseStorage.setStorage(LocalStorageKey.SHIPPING_ADDRESS_ID, result);
    //         },
    //         error => {
    //           console.error(error);
    //         }
    //       );
    //     },
    //     err => {
    //       console.error(err);
    //     });
    // } else {
    //   this.baseStorage.setStorage(LocalStorageKey.SHIPPING_ADDRESS_ID, address);
    // }
  }

  getRadioValue(value: any) {
    const temp = this.shippingFormGroup.get('addresses') as FormArray;
    this.selectedAddress = temp.at(value).value;
    this.nextClicked = false;
  }

  private loadAdressesView() {
    const currentAddressFormArray = this.shippingFormGroup.get('addresses') as FormArray;
    this.customerAddresses = this.customer.addresses;
    let i = 0;
    for (const address of this.customerAddresses) {
      const newAddressGroup = this.createAddress(i);
      currentAddressFormArray.push(newAddressGroup);
      i++;
    }
  }
}
