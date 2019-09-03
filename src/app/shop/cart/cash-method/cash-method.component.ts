import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../shared/services/cart.service';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';

@Component({
  selector: 'app-cash-method',
  templateUrl: './cash-method.component.html',
})
export class CashMethodComponent implements OnInit {

  constructor(private cartService: CartService, private purchaseService: PurchaseService,
              private baseStorage: BaseStorageService) { }

  ngOnInit() {
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
