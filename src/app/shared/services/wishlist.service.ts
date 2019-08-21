import {ProductWishlistModel} from '../models/product-wishlist.model';
import {BaseStorageService} from './base-storage.service';
import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../constants/local-storage-key';
import {ProductService} from './product.service';
import {ProductCartModel} from "../models/product-cart.model";
import {ProductModel} from "../models/product.model";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private storageService:StorageService,
              private baseStorage: BaseStorageService,
              private productService: ProductService) {

  }

  getProductsFromWishlist(): ProductCartModel[] {
    return this.baseStorage.getStorageOf(LocalStorageKey.CART);
  }

  getProductInWishlist(id: number): boolean {
    return this.baseStorage.getElementInStorage(id, LocalStorageKey.WISHLIST);
  }


  addToWishlist(id: number) {
    const wishlist = this.storageService.get('wishlist');
    if (wishlist) {
      const wishlistArray = JSON.parse(wishlist);
      if (wishlistArray.filter(item => item == id).length > 0) {
        return;
      } else {
        wishlistArray.push(id);
        this.storageService.set('wishlist', JSON.stringify(wishlistArray));
      }
    } else {
      this.storageService.set('wishlist', JSON.stringify([id]));
    }
  }

  // delete from wishlist
  deleteFromWishlist(id: number) {
    this.baseStorage.deleteElementInStorage(id, LocalStorageKey.WISHLIST);
  }
}
