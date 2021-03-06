import {ProductCartModel} from '../models/product-cart.model';
import {BaseStorageService} from './base-storage.service';
import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../constants/local-storage-key';
import {ProductService} from './product.service';
import {ReplaySubject} from 'rxjs';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSubject = new ReplaySubject(1);

  constructor(private baseStorage: BaseStorageService, private productService: ProductService) {
  }

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
      const prodModel = this.productService.getProduct(id);

      cart.push(newProductInCart);
    }
    this.baseStorage.setStorage(LocalStorageKey.CART, cart);
    this.cartSubject.next(cart);
  }

  getCartDataFromSubject() {
    return this.cartSubject.asObservable();
  }

  deleteFromCart(id: number) {
    this.baseStorage.deleteElementInStorage(id, LocalStorageKey.CART);
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

  generateTotalPrice(): number {
    const array = this.getProductsFromCart();
    const tempTotal = [];
    if(array.length > 0) {
      array.forEach(value => {
        tempTotal.push(value.product.unitPrice * value.qty);
      });
    }else {
      tempTotal.push(null);
    }
    return tempTotal.reduce((previousValue, currentValue) => previousValue + currentValue);
  }
}
