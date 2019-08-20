import {ProductCartModel} from '../models/product-cart.model';
import {BaseStorageService} from './base-storage.service';
import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../constants/local-storage-key';
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private baseStorage: BaseStorageService,private productService: ProductService) {

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
      newProductInCart.product = this.productService.getProduct(id);
      newProductInCart.isInStock = this.productService.getProduct(id).isInStock();

      cart.push(newProductInCart);
    }
    //vlaqko thire headerin kallxoj qe e kom ndru karten
    // save
    this.baseStorage.setStorage(LocalStorageKey.CART, cart);
  }

  deleteFromCart(id: number) : any{
    this.baseStorage.deleteElementInStorage(id,LocalStorageKey.CART);
    this.getProductsFromCart();
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


  getAllCartItems(){
    const storage = localStorage.getItem(LocalStorageKey.CART);

  }
}
