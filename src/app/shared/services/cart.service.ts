import {ProductCartModel} from '../models/product-cart.model';
import {BaseStorageService} from './base-storage.service';
import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../constants/local-storage-key';
import {ProductService} from "./product.service";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {CartPreviewComponent} from "../../shop/cart/cart-preview/cart-preview.component";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSubject = new ReplaySubject(1);

  constructor(private baseStorage: BaseStorageService,private productService: ProductService) {}

  getProductsFromCart(): ProductCartModel[] {
    let carts = this.baseStorage.getStorageOf(LocalStorageKey.CART);
    this.cartSubject.next(carts);
    return carts;
  }

  addToCart(id: number, qty?: number): void {
    let cart = this.getProductsFromCart();
    if (!qty) {
      qty = 1;
    }

    if (cart.filter(item => item.id == id).length > 0) {
      // update quantity
      cart = cart.map(item => {
        if (item.id == id) {
          item.qty += qty;
        }

        return item;
      });
    } else {
      const newProductInCart = new ProductCartModel();
      newProductInCart.id = id;
      newProductInCart.qty = qty;
      newProductInCart.product = this.productService.getProduct(id);
      newProductInCart.isInStock = this.productService.getProduct(id).isInStock();

      cart.push(newProductInCart);
    }
    this.baseStorage.setStorage(LocalStorageKey.CART, cart);
    this.cartSubject.next(cart);
  }

  getCartDataFromSubject() {
    return this.cartSubject.asObservable();
  }

  deleteFromCart(id: number){
    this.baseStorage.deleteElementInStorage(id,LocalStorageKey.CART);
    this.getProductsFromCart();
    // window.location.reload();
  }

  changeProductCartQuantity(id: number, quantity: number) {
    const cart = this.getProductsFromCart().map(item => {
      if (item.id == id) {
        item.qty = quantity;
      }

      return item;
    });
    // save
    this.baseStorage.setStorage(LocalStorageKey.CART, cart);
  }

}
