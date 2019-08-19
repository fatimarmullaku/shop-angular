import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../../../shared/services/customer.service';
import {CustomerModel} from 'src/app/shared/models/customer.model';
import {UserModel} from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html'
})
export class InformationComponent implements OnInit {
  informationForm: FormGroup;
  user: UserModel;
  customer: CustomerModel;
  phones: FormArray;
  addresses: FormArray;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customer = this.customerService.getCustomer(1);
    this.informationForm = this.formBuilder.group({
      phoneNumbers: this.formBuilder.array([this.createPhoneNumber()]),
      addresses: this.formBuilder.array([this.createAddress()])
    });
  }

  createPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      mobile: new FormControl(''),
      home:  new FormControl('')
    });
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      country: new FormControl(''),
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

    this.phones.removeAt(index);
  }

  onAddressDelete(event: any, index: number) {
    event.preventDefault();

    this.addresses.removeAt(index);
  }

  onSubmit(event: any) {
    event.preventDefault();

    console.log(this.informationForm.getRawValue());
  }

}
