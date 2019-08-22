import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../../../shared/services/customer.service';
import {CustomerModel} from 'src/app/shared/models/customer.model';
import {UserModel} from '../../../../../shared/models/user.model';
import {PhoneNumberModel} from '../../../../../shared/models/phoneNumber.model';
import {AddressModel} from '../../../../../shared/models/address.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html'
})
export class InformationComponent implements OnInit {
  informationForm: FormGroup;
  user: UserModel;
  customer: CustomerModel;
  customerPhoneNumbers: PhoneNumberModel[];
  customerAddresses: AddressModel[];
  phones: FormArray;
  addresses: FormArray;
  firstName: FormControl;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    this.customer = this.customerService.getCustomer(1);
    this.customerService.getCustomerFromServer().subscribe(res => {
        console.log(res);
      },
      (error) => {
        console.error(error);
      });
    this.informationForm = this.formBuilder.group({
      firstName: new FormControl(''),
      phoneNumbers: this.formBuilder.array([]),
      addresses: this.formBuilder.array([])
    });

    this.customerPhoneNumbers = this.customer.phoneNumbers;
    this.customerAddresses = this.customer.addresses;

    const currentContactFormArray = this.informationForm.get('phoneNumbers') as FormArray;
    const currentAddressFormArray = this.informationForm.get('addresses') as FormArray;

    for (const phoneNumber of this.customerPhoneNumbers) {
      const newPhoneNumberGroup = this.createPhoneNumber();
      currentContactFormArray.push(newPhoneNumberGroup);
    }
    for (const address of this.customerAddresses) {
      const newAddressGroup = this.createAddress();
      currentAddressFormArray.push(newAddressGroup);
    }
  }

  createPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      mobile: new FormControl(''),
      home: new FormControl('')
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

  onAddPhoneNumber(event: any) {
    event.preventDefault();
    this.phones = this.informationForm.get('phoneNumbers') as FormArray;
    this.phones.push(this.createPhoneNumber());
  }

  onAddAddress(event: any) {
    event.preventDefault();
    this.addresses = this.informationForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }

  onPhoneDelete(event: any, index: number) {
    event.preventDefault();
    if (this.customerPhoneNumbers[index]) {
      this.customerPhoneNumbers = this.customerPhoneNumbers.filter(item => item.mobile != this.customerPhoneNumbers[index].mobile);
    }
    this.phones.removeAt(index);
    console.log(this.customerPhoneNumbers);
  }

  onAddressDelete(event: any, index: number) {
    event.preventDefault();

    if (this.customerAddresses[index]) {
      this.customerAddresses = this.customerAddresses.filter(item => item.street != this.customerAddresses[index].street);
    }
    this.addresses.removeAt(index);
  }

  onSubmit(event: any) {
    event.preventDefault();

    console.log(this.informationForm.getRawValue());
  }

}
