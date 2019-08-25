import {ProductWishlistModel} from '../models/product-wishlist.model';
import {BaseStorageService} from './base-storage.service';
import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../constants/local-storage-key';
import {ProductService} from './product.service';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService{
  wishlistSubject = new ReplaySubject(1);

  constructor(private baseStorage: BaseStorageService, private productService: ProductService) {
  }

  getProductsFromWishlist(): ProductWishlistModel[] {
    let wishlists = this.baseStorage.getStorageOf(LocalStorageKey.WISHLIST);
    this.wishlistSubject.next(wishlists);
    return wishlists;
  }

  getProductInWishlist(id: number): boolean {
    return this.baseStorage.getElementInStorage(id, LocalStorageKey.WISHLIST);
  }

  addToWishlist(id: number): void {
    let wishlist = this.getProductsFromWishlist();

    if (wishlist.filter(item => item.id == id).length > 0) {
      wishlist = wishlist.map(item => {
        return item;
      });
    } else {
      const newProductInWishlist = new ProductWishlistModel();
      newProductInWishlist.id = id;
      newProductInWishlist.product = this.productService.getProduct(id);

      wishlist.push(newProductInWishlist);
    }
    this.baseStorage.setStorage(LocalStorageKey.WISHLIST, wishlist);
    this.wishlistSubject.next(wishlist);
  }

  getWishlistDataFromSubject() {
    return this.wishlistSubject.asObservable();
  }

  deleteFromWishlist(id: number) {
    this.baseStorage.deleteElementInStorage(id, LocalStorageKey.WISHLIST);
    this.getProductsFromWishlist();
  }

}
