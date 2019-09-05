import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CartService} from '../../../shared/services/cart.service';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';



@Component({
  selector: 'app-creditcard-method',
  templateUrl: './creditcard-method.component.html',
})
export class CreditcardMethodComponent implements OnInit {

  creditCard: FormGroup;

  constructor(public cartService: CartService,
              private purchaseService: PurchaseService,
              private baseStorage: BaseStorageService,
              private formBuilder: FormBuilder,
              ) {
  }

  ngOnInit() {
      this.creditCard = this.formBuilder.group({
          creditCardNumber: new FormControl(''),
          expireMonth: new FormControl(''),
          expireYear: new FormControl(''),
          cvc: new FormControl('')
      });
  }

  get form() {
    return this.creditCard.controls;
  }

  buy() {
    this.purchaseService.buy().subscribe((res) => {
        this.baseStorage.clearStorageOf(LocalStorageKey.CART);
        this.baseStorage.clearStorageOf(LocalStorageKey.SHIPPING_ADDRESS_ID);
      },
      (error) => {
        console.error(error);
      });
  }

  generateTotalPrice() {
    return this.cartService.generateTotalPrice();
  }
}
