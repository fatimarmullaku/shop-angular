import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CustomerService} from '../../../shared/services/customer.service';
@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html'
})
export class AdditionalInformationComponent implements OnInit {

  informationForm: FormGroup;
  phones: FormArray;
  addresses: FormArray;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.informationForm = this.formBuilder.group({
      phoneNumbers: this.formBuilder.array([this.createPhoneNumber()]),
      addresses: this.formBuilder.array([this.createAddress()])
    });
  }

  createPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: new FormControl('')
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

  onSubmit() {

    console.log(this.informationForm.getRawValue());
    this.customerService.updateCusometWithRestService(this.informationForm.getRawValue());
    this.customerService.updateCustomer(this.informationForm.getRawValue());
  }
}
