import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html'
})
export class AdditionalInformationComponent implements OnInit {

  informationForm: FormGroup;
  phones: FormArray;
  addresses: FormArray;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private routerLink: Router) {
  }

  ngOnInit() {
    this.informationForm = this.formBuilder.group({
      phoneNumbers: this.formBuilder.array([this.createPhoneNumber()]),
      addresses: this.formBuilder.array([this.createAddress()])
    });
  }

  createPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      // mobile: new FormControl(''),
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

  onSubmit(event: any) {
    event.preventDefault();

    console.log(this.informationForm.getRawValue());
    this.userService.addPhonesAndAddresses(this.informationForm.getRawValue()).subscribe((res) => {
      console.log('RETURN FROM SERVER: ' + res);
      this.routerLink.navigateByUrl('/');
    }, (error) => {
      console.error(error);
    });
  }
}
