import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  addresses: FormArray;
  customer: CustomerModel;
  submitted = false;
  readOnlyProfile = true;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private routerLink: Router,
              private baseStorage: BaseStorageService,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.editProfileFormGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: new FormControl('', Validators.required),
      addresses: this.formBuilder.array([this.createAddress()])
    });

    this.customerService.getCustomer().subscribe(response => {
        this.customer = response;
        this.editProfileFormGroup.patchValue({
          name: response.name,
          email: response.email,
          phoneNumber: response.phoneNumber,
          addresses: response.addresses,
        });
      }
    );
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      id: [-1],
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.editProfileFormGroup.controls;
  }

  editProfile() {
    this.readOnlyProfile = false;
  }

  readProfile() {
    this.readCustomerInfo();
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProfileFormGroup.invalid) {
      return;
    }

    console.log(this.editProfileFormGroup.getRawValue());
    this.userService.addPhonesAndAddresses(this.editProfileFormGroup.getRawValue()).subscribe((res) => {
      this.readProfile();
    }, (error) => {
      console.error(error);
    });
  }

  readCustomerInfo() {
    this.customerService.getCustomer().subscribe(response => {
        this.customer = response;
        this.readOnlyProfile = true;
        this.editProfileFormGroup.patchValue({
          name: response.name,
          email: response.email,
          phoneNumber: response.phoneNumber,
          addresses: response.addresses,
        });
      }
    );
  }
}
