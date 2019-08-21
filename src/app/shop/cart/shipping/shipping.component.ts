import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CustomerModel} from '../../../shared/models/customer.model';
import {AddressModel} from '../../../shared/models/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../shared/services/customer.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html'
})
export class ShippingComponent implements OnInit {
  shippingFormGroup: FormGroup;
  customer: CustomerModel;
  customerAddresses: AddressModel[];
  addresses: FormArray;
  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customer = this.customerService.getCustomer(1);

    this.shippingFormGroup = this.formBuilder.group({
      addresses: this.formBuilder.array([])
    });

    this.customerAddresses = this.customer.addresses;

    const currentAddressFormArray = this.shippingFormGroup.get('addresses') as FormArray;

    for (const address of this.customerAddresses) {
      const newAddressGroup = this.createAddress();
      currentAddressFormArray.push(newAddressGroup);
    }
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
    console.log(this.customerAddresses[0]);

  }
}
