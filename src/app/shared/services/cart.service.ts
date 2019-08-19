import {ProductCartModel} from '../models/product-cart.model';
import {BaseStorageService} from './base-storage.service';
import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../constants/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private baseStorage: BaseStorageService) {

  }

  getProductsFromCart(): ProductCartModel[] {
    return this.baseStorage.getStorageOf(LocalStorageKey.CART);
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
      cart.push(newProductInCart);
    }

    // save
    this.baseStorage.setStorage(LocalStorageKey.CART, cart);
  }

  deleteFromCart(id: number) {
    this.baseStorage.deleteElementInStorage(id, LocalStorageKey.CART);
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
