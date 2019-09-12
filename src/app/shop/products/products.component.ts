import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ProductModel} from '../../shared/models/product.model';
import {ProductsService} from './products.service';
import {UserService} from '../../shared/services/user.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageKey} from '../../shared/constants/local-storage-key';
import {Router} from '@angular/router';
import {BaseStorageService} from '../../shared/services/base-storage.service';
import {PaginationModel} from '../../shared/models/pagination.model';
import {PaginationService} from '../../shared/pagination/pagination.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [PaginationService]
})
export class ProductsComponent implements OnInit {
  products: ProductModel[];
  informationForm: FormGroup;
  addresses: FormArray;
  submitted = false;
  numbersOnlyValidator = false;
  currentPage = 1;
  pageSize = 8;
  temporaryEventState: any;
  postponedCall: any;
  searchText = '';

  constructor(private productService: ProductService,
              private productsService: ProductsService,
              public   userService: UserService,
              private formBuilder: FormBuilder,
              private routerLink: Router,
              private baseStorage: BaseStorageService,
              private paginationService: PaginationService,
              private router: Router) {
  }

  get f() {
    return this.informationForm.controls;
  }

  ngOnInit() {
    // this.products = this.productService.getProducts();

    this.informationForm = this.formBuilder.group({
      phoneNumber: new FormControl('', Validators.required),
      addresses: this.formBuilder.array([this.createAddress()])
    });
    if (!this.temporaryEventState) {
      this.temporaryEventState = {page: 1, size: this.pageSize, min: 0, max: 100};
    }
    this.paginationService.currentPage.subscribe(currentPage => {
      this.currentPage = currentPage;
      this.setRequestAditionalPropertiesAndMakeRequest(this.currentPage - 1, this.pageSize, this.searchText, this.temporaryEventState);
  // here
    });

  }

  onFilterChange(event: any) {
    this.productsService.getProductBySelectedPrice(event).subscribe((response: PaginationModel<ProductModel>) => {
      this.products = response.content;
      this.paginationService.changeTotalPages(response.totalPages);
      this.router.navigate(['/'], { queryParams: {page:this.currentPage} });
    });
  }

  resetPageAndMakeRequest(event: any) {
    this.temporaryEventState = event;
    this.paginationService.changePage(1);
  }

  simpleRequest() {
    this.paginationService.changePage(1);
  }

  setRequestAditionalPropertiesAndMakeRequest(page: number, size: number, productName: string, event: any) {
    event.page = page;
    event.size = size;
    if (productName) {
      if (productName.trim() !== '') {
        event.productName = productName.trim();
      } else {
        delete event.productName;
      }
    } else {
      delete event.productName;
    }
    this.onFilterChange(event);
  }

  postponedResetPageAndMakeRequest() {
    if (this.postponedCall) {
      clearTimeout(this.postponedCall);
    }
    this.postponedCall = setTimeout(() => {
      this.simpleRequest();
    }, 800);
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

}


