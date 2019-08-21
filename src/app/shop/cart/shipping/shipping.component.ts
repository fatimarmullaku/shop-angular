import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {HeaderComponent} from "../../../shared/header/header.component";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  // shippingForm: FormGroup;
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts();
    this.cartService.getProductsFromCart();
  }

}
