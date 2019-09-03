import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CartService} from '../../../shared/services/cart.service';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';
import {StripeJS} from "ngx-stripe";
import {StripeCard} from "stripe-angular";


@Component({
  selector: 'app-creditcard-method',
  templateUrl: './creditcard-method.component.html',
})
export class CreditcardMethodComponent implements OnInit {

  creditCard : FormGroup;

  constructor(private cartService: CartService,
              private purchaseService: PurchaseService,
              private baseStorage: BaseStorageService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
      this.creditCard = this.formBuilder.group({
          creditCardNumber: new FormControl(''),
          expireDate: new FormControl(''),
          cvc: new FormControl('')
      })
  }

  get form() {
    return this.creditCard.controls;
  }

  chargeCreditCard() {
  //     StripeCard.prototype.createToken({
  //       number: this.form.creditCardNumber.value,
  //       expMonth: this.form.expDate.
  //     })
    const name = this.creditCard.getRawValue();
    console.log(name);

  }
  //
  // buy() {
  //   this.purchaseService.buy().subscribe((res) => {
  //       this.baseStorage.clearStorageOf(LocalStorageKey.CART);
  //       this.baseStorage.clearStorageOf(LocalStorageKey.SHIPPING_ADDRESS_ID);
  //     },
  //     (error) => {
  //       console.error(error);
  //     });
  // }

  generateTotalPrice() {
    return this.cartService.generateTotalPrice();
  }
}
