import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ProductModel} from '../../shared/models/product.model';
import {ProductsService} from './products.service';
import {UserService} from '../../shared/services/user.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageKey} from '../../shared/constants/local-storage-key';
import {Router} from '@angular/router';
import {BaseStorageService} from '../../shared/services/base-storage.service';
import {PaginationModel} from "../../shared/models/pagination.model";
import {ProductsModel} from "../../admin/products/products.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductModel[];
  informationForm: FormGroup;
  addresses: FormArray;
  submitted = false;
  numbersOnlyValidator = false;

  constructor(private productService: ProductService,
              private productsService: ProductsService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private routerLink: Router,
              private baseStorage: BaseStorageService) {
  }

  get f() {
    return this.informationForm.controls;
  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.informationForm = this.formBuilder.group({
      phoneNumber: new FormControl('', Validators.required),
      addresses: this.formBuilder.array([this.createAddress()])
    });

  }

  onFilterChange(event: any) {
    this.productsService.getProductByPlatformAndBrand(event).subscribe(res => {
      this.products = res;
    });
  }

  onFilterPriceChange(event: any) {
    this.productsService.getProductBySelectedPrice(event).subscribe((res: any ) => {
      this.products = res;
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
      // if ((cartStorage && cartStorage.length > 0) && dummyKey) {
      //   this.routerLink.navigateByUrl('/cart/shipping');
      // } else {
      //   this.routerLink.navigateByUrl('/');
      // }

      this.removeActiveClass();
    }, (error) => {
      console.error(error);
    });
  }

  skipAdditionalInformation() {
    const cartStorage = this.baseStorage.getStorageOf(LocalStorageKey.CART);
    const dummyKey = this.baseStorage.getStorageOf(LocalStorageKey.TEMP_SHIPPING_KEY, true);
    // if ((cartStorage && cartStorage.length > 0) && dummyKey) {
    //   this.routerLink.navigateByUrl('/cart/shipping');
    // } else {
    //   this.routerLink.navigateByUrl('/');
    // }

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
}


