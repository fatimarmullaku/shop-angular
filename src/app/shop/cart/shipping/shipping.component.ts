import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CustomerModel} from '../../../shared/models/customer.model';
import {AddressModel} from '../../../shared/models/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../shared/services/customer.service';
import {HttpRequestMethod} from '../../../shared/constants/http-request.method';
import {ENDPOINTS} from '../../../shared/constants/api.constants';
import {RestService} from '../../../shared/services/rest.service';

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

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private restService: RestService,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    this.fetchCustomers();
    this.shippingFormGroup = this.formBuilder.group({
      addresses: this.formBuilder.array([])
    });
  }

  fetchCustomers(): void {
    /*const customer1 = new CustomerModel();
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

    // const secAddress = new AddressModel();
    //
    // secAddress.country = 'shqiperi';
    // secAddress.city = 'tirana';
    // secAddress.zipCode = 10000;
    // secAddress.street = 'rruga b';
    customer1.addresses = [firstAddress];

    this.customers = [customer1];*/
    this.restService.publicRequest<any>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll)
      .subscribe((res) => {
          this.customer = res.filter(item => item.id === 1)[0];
          this.loadAdressesView();
        },
        error => {
          console.error(error);
        });
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      country: this.customer.addresses,
      city: new FormControl(''),
      zipCode: new FormControl(''),
      street: new FormControl('')
    });
  }

  onAddAddress(event: any) {
    event.preventDefault();
    this.addresses = this.shippingFormGroup.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }

  onSubmit(event: any) {
    event.preventDefault();

    console.log(this.shippingFormGroup.getRawValue());

  }

  getRadioValue(value: any) {
    if (value === 'radio0') {
      console.log('VALUE OF RADIO: ', this.shippingFormGroup.getRawValue()[0]);
      this.nextClicked = false;
    } else if (value === 'radio1') {
      console.log('VALUE OF RADIO 2: ', this.shippingFormGroup.getRawValue()[1]);
      this.nextClicked = false;
    }
  }

  private loadAdressesView() {
    const currentAddressFormArray = this.shippingFormGroup.get('addresses') as FormArray;
    this.customerAddresses = this.customer.addresses;

    for (const address of this.customerAddresses) {
      const newAddressGroup = this.createAddress();
      currentAddressFormArray.push(newAddressGroup);
    }
  }
}
