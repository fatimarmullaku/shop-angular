import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../shared/services/cart.service';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-paypal-method',
  templateUrl: './paypal-method.component.html',
})
export class PaypalMethodComponent implements OnInit {

  paypalForm: FormGroup;
  submitted = false;

  constructor(private cartService: CartService,
              private purchaseService: PurchaseService,
              private baseStorage: BaseStorageService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  get f() {
    return this.paypalForm.controls;
  }

  ngOnInit() {
    this.paypalForm = this.formBuilder.group({
      paypalEmail: ['', [Validators.required, Validators.email]],
      paypalPassword: ['', Validators.required]
    });
  }

  buy() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.paypalForm.invalid) {
      return;
    }

    this.purchaseService.buy().subscribe((res) => {
        this.baseStorage.clearStorageOf(LocalStorageKey.CART);
        this.baseStorage.clearStorageOf(LocalStorageKey.SHIPPING_ADDRESS_ID);
      },
      (error) => {
        console.error(error);
      });
    this.router.navigateByUrl('cart/success-screen');

  }

  generateTotalPrice() {
    return this.cartService.generateTotalPrice();
  }

}
