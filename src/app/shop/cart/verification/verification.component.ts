import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html'
})
export class VerificationComponent implements OnInit {


  constructor(private cartService:CartService) {
  }

  ngOnInit() {
    this.cartService.getProductsFromCart();
  }

}
