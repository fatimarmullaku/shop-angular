import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html'
})
export class AdditionalInformationComponent implements OnInit {

  informationForm: FormGroup;
  addresses: FormArray;
  submitted = false;
  numbersOnlyValidator = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private routerLink: Router,
              private baseStorage: BaseStorageService) {
  }

  ngOnInit() {
    this.informationForm = this.formBuilder.group({
      phoneNumber: new FormControl('', Validators.required),
      addresses: this.formBuilder.array([this.createAddress()])
    });
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.informationForm.invalid) {
      return;
    }
    this.userService.addPhonesAndAddresses(this.informationForm.getRawValue()).subscribe((res) => {
      const cartStorage = this.baseStorage.getStorageOf(LocalStorageKey.CART);
      const dummyKey = this.baseStorage.getStorageOf(LocalStorageKey.TEMP_SHIPPING_KEY, true);
      if ((cartStorage && cartStorage.length > 0) && dummyKey) {
        this.routerLink.navigateByUrl('/cart/shipping');
      } else {
        this.routerLink.navigateByUrl('/');
      }
    }, (error) => {
      console.error(error);
    });
  }

  skipAdditionalInformation() {
    const cartStorage = this.baseStorage.getStorageOf(LocalStorageKey.CART);
    const dummyKey = this.baseStorage.getStorageOf(LocalStorageKey.TEMP_SHIPPING_KEY, true);
    if ((cartStorage && cartStorage.length > 0) && dummyKey) {
      this.routerLink.navigateByUrl('/cart/shipping');
    } else {
      this.routerLink.navigateByUrl('/');
    }
  }

  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.numbersOnlyValidator = true;
      return false;
    }
    this.numbersOnlyValidator = false;
    return true;

  }

  get f() {
    return this.informationForm.controls;
  }
}
