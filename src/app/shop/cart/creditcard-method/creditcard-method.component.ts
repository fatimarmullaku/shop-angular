import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../../shared/services/cart.service';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';
import {RestService} from '../../../shared/services/rest.service';
import {HttpRequestMethod} from '../../../shared/constants/http-request.method';
import {ENDPOINTS} from '../../../shared/constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {CreditCardValidator} from 'angular-cc-library';


@Component({
  selector: 'app-creditcard-method',
  templateUrl: './creditcard-method.component.html',
})
export class CreditcardMethodComponent implements OnInit {

  creditCard: FormGroup;
  checkoutConfirm = false;

  constructor(public cartService: CartService,
              private purchaseService: PurchaseService,
              private baseStorage: BaseStorageService,
              private formBuilder: FormBuilder,
              private restService: RestService,
              private httpClient: HttpClient
  ) {
  }

  get form() {
    return this.creditCard.controls;
  }

  ngOnInit() {

    this.creditCard = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      creditCardNumber: ['', [<any> CreditCardValidator.validateCCNumber, Validators.required]],
      expireYear: ['', [<any> CreditCardValidator.validateExpDate, Validators.required]],
      cvc: ['', [Validators.required, Validators.minLength(3), <any> Validators.maxLength(4)]]
    });

  }

  createCustomer(): boolean {
    if (this.creditCard.get('creditCardNumber').invalid && this.creditCard.get('expireYear').invalid && this.creditCard.get('cvc').invalid && this.creditCard.get('fullName').invalid) {
      alert('Please fill your credit information');
      return;
    }

    if (this.creditCard.get('creditCardNumber').valid && this.creditCard.get('expireYear').valid && this.creditCard.get('cvc').valid && this.creditCard.get('fullName').invalid) {
      alert('Please enter your name');
      return;
    }
    if (this.creditCard.get('fullName').valid && this.creditCard.get('expireYear').valid && this.creditCard.get('cvc').valid && this.creditCard.get('creditCardNumber').invalid) {
      alert('Please enter a valid card');
      return;
    }
    if (this.creditCard.get('creditCardNumber').valid && this.creditCard.get('fullName').valid && this.creditCard.get('cvc').valid && this.creditCard.get('expireYear').invalid) {
      alert('Please enter your credit card expire date');
      return;
    }
    if (this.creditCard.get('creditCardNumber').valid && this.creditCard.get('expireYear').valid && this.creditCard.get('fullName').valid && this.creditCard.get('cvc').invalid) {
      alert('Please Enter cvc number');
      return;
    }

    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    this.restService.publicRequest<any>(HttpRequestMethod.POST, ENDPOINTS.stripe.createStripeCustomer + `/${customerId}`)
      .subscribe(result => {
        console.log(result);
      });
    return this.checkoutConfirm = true;
  }

  buy() {

    const customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);

    const params = new FormData();
    params.append('customerId', customerId);
    params.append('amount', this.generateTotalPrice().toFixed(2));
    setTimeout(() => {
      this.httpClient.post<any>(ENDPOINTS.stripe.charge, params).subscribe(result => {
        console.log(result);

        this.purchaseService.buy().subscribe((res) => {
            this.baseStorage.clearStorageOf(LocalStorageKey.CART);
            this.baseStorage.clearStorageOf(LocalStorageKey.SHIPPING_ADDRESS_ID);
          },
          (error) => {
            console.error(error);
          });

      });
    }, 3000);
  }

  generateTotalPrice() {
    return this.cartService.generateTotalPrice();
  }

  cancelModal(): boolean {
    return this.checkoutConfirm = false;
  }
}
