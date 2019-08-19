import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ProductCartModel} from "../models/product-cart.model";
import {CartService} from "../services/cart.service";
import {CartPreviewComponent} from "../../shop/cart/cart-preview/cart-preview.component";
import {ProductModel} from "../models/product.model";
import {ProductService} from "../services/product.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  products: ProductModel[];
  cartProducts: ProductCartModel[];
  status: boolean = false;
  status2: boolean = false;

  constructor(private userService: UserService,private cartService: CartService,private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartProducts = this.cartService.getProductsFromCart();  }



  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  toggleClass(){
      this.status = !this.status;
  }

  toggleClass2(){
    this.status2 = !this.status2;
  }

}
