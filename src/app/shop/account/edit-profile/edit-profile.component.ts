import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CustomerService} from '../../../shared/services/customer.service';
import {CustomerModel} from '../../../shared/models/customer.model';
import {Observable} from 'rxjs';
import {AddressModel} from '../../../shared/models/address.model';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  editProfileFormGroup: FormGroup;
  phones: FormArray;
  addresses: FormArray;
  customer: CustomerModel;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private routerLink: Router,
              private baseStorage: BaseStorageService,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.editProfileFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(['']),
      email: this.formBuilder.control(['']),
      phoneNumbers: this.formBuilder.array([this.createPhoneNumber()]),
      addresses: this.formBuilder.array([this.createAddress()])
    });

    this.customerService.getCustomer().subscribe(response => {
        this.customer = response;
        this.editProfileFormGroup.patchValue({
          name: response.name,
          email: response.email,
          phoneNumbers: response.phoneNumbers,
          addresses: response.addresses,
        });
      }
    );
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

  onSubmit(event: any) {
    event.preventDefault();
    console.log(this.editProfileFormGroup.getRawValue());
    this.userService.addPhonesAndAddresses(this.editProfileFormGroup.getRawValue()).subscribe((res) => {
    }, (error) => {
      console.error(error);
    });
  }
}
