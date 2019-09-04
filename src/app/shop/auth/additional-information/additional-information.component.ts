import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
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


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private routerLink: Router,
              private baseStorage: BaseStorageService) {
  }

  ngOnInit() {
    this.informationForm = this.formBuilder.group({
      phoneNumber: this.formBuilder.control(['']),
      addresses: this.formBuilder.array([this.createAddress()])
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

  onSubmit() {
    console.log(this.informationForm.getRawValue());
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
}
