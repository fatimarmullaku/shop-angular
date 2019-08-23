import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ProductCartModel} from "../models/product-cart.model";
import {CartService} from "../services/cart.service";
import {ProductModel} from "../models/product.model";
import {ProductService} from "../services/product.service";
import {BaseStorageService} from "../services/base-storage.service";
import {LocalStorageKey} from "../constants/local-storage-key";
import {StorageService} from "../services/storage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  products: ProductModel[];
  cartProducts: ProductCartModel[];
  cartQty = 0;
  status: boolean = false;
  status2: boolean = false;

  constructor(private userService: UserService,
              private cartService: CartService,
              private productService: ProductService,
              private storageService: StorageService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartProducts = this.cartService.getProductsFromCart();
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartService.getCartDataFromSubject().subscribe(
      result => {
        if (result) {
          this.cartQty = 0;
            const carts = result as Array<ProductCartModel>;
            carts.forEach(item => {
              this.cartQty += item.qty;
            })
          }
      }
    );
  }

  toggleClass(){
      this.status = !this.status;
  }

  toggleClass2(){
    this.status2 = !this.status2;
  }

  isLoggedIn(): boolean{
    const element = this.storageService.get(LocalStorageKey.ACCESS_TOKEN);
    let isLogedIn = false;
    if(element != null){
      isLogedIn = !isLogedIn;
    }
    return isLogedIn;
  }
}
