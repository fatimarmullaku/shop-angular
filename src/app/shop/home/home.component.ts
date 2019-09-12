import {TopProductsService} from '../../shared/services/top-products.service';
import {ENDPOINTS} from '../../shared/constants/api.constants';
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageKey} from '../../shared/constants/local-storage-key';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {BaseStorageService} from '../../shared/services/base-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public top4 = [];
  imgPath: string = ENDPOINTS.products.getProductImage;
  informationForm: FormGroup;
  addresses: FormArray;
  submitted = false;
  numbersOnlyValidator = false;

  constructor(private topSold: TopProductsService,
              public   userService: UserService,
              private formBuilder: FormBuilder,
              private routerLink: Router,
              private baseStorage: BaseStorageService) {
  }

  ngOnInit() {
    this.topSold.getTopSoldProducts(4).subscribe(data => {
      this.top4 = data;
    });
    this.informationForm = this.formBuilder.group({
      phoneNumber: new FormControl('', Validators.required),
      addresses: this.formBuilder.array([this.createAddress()])
    });
  }

  removeActiveClass() {
    this.userService.justSignUp = !this.userService.justSignUp;
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
      this.removeActiveClass();
    }, (error) => {
      console.error(error);
    });
  }

  skipAdditionalInformation() {
    const cartStorage = this.baseStorage.getStorageOf(LocalStorageKey.CART);
    const dummyKey = this.baseStorage.getStorageOf(LocalStorageKey.TEMP_SHIPPING_KEY, true);
    this.removeActiveClass();
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
