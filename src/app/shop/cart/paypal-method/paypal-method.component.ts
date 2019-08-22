import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {PurchaseService} from "../../../shared/services/purchase.service";

@Component({
  selector: 'app-paypal-method',
  templateUrl: './paypal-method.component.html',
})
export class PaypalMethodComponent implements OnInit {



  constructor(private cartService : CartService,private purchaseService: PurchaseService) {
  }

  ngOnInit() {
  }

  buy(): any{
    this.purchaseService.buy();
  }

}
