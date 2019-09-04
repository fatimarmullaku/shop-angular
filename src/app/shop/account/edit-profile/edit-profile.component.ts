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
  isModalActive = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private routerLink: Router,
              private baseStorage: BaseStorageService,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.editProfileFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
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
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  get f() {
    return this.editProfileFormGroup.controls;
  }

  get a() {
    return this.createAddress().controls;
  }

  onSubmit() {
    // event.preventDefault();
    this.submitted = true;
    console.log(this.a.city.errors.required);
    if (this.editProfileFormGroup.invalid) {
      return;
    }
    console.log(this.editProfileFormGroup.getRawValue());
    this.userService.addPhonesAndAddresses(this.editProfileFormGroup.getRawValue()).subscribe((res) => {
      this.isModalActive = true;
    }, (error) => {
      console.error(error);
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

  removeActiveClass() {
    this.isModalActive = !this.isModalActive;
  }
}
