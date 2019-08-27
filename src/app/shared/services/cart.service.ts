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
    console.log(carts);
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
      // newProductInCart.isInStock = this.productService.getProduct(id).isInStock();
      const prodModel = this.productService.getProduct(id);
      newProductInCart.isInStock = ProductModel.isInStock(prodModel);

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
    array.forEach(value => {
      tempTotal.push(value.product.unitPrice * value.qty);
    });
    return tempTotal.reduce((previousValue, currentValue) => previousValue + currentValue);
  }
}
