import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../constants/local-storage-key';
import {BaseStorageService} from './base-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private baseStorage: BaseStorageService) {
  }

// get wishlist product
  getProductInWishlist(id: number): boolean {
    return this.baseStorage.getElementInStorage(id, LocalStorageKey.WISHLIST);
  }

  // add to wishlist
  addToWishlist(id: number) {
    const wishlist = this.baseStorage.getStorageOf(LocalStorageKey.WISHLIST);
    if (wishlist) {
      if (wishlist.filter(item => item == id).length > 0) {
        return;
      } else {
        wishlist.push(id);
        this.baseStorage.setStorage(LocalStorageKey.WISHLIST, wishlist);
      }
    } else {
      this.baseStorage.setStorage(LocalStorageKey.WISHLIST, [id]);
    }
  }

  // delete from wishlist
  deleteFromWishlist(id: number) {
    this.baseStorage.deleteElementInStorage(id, LocalStorageKey.WISHLIST);
  }

  // clear wishlist
  clearWishList() {
    this.baseStorage.clearStorageOf(LocalStorageKey.WISHLIST);
  }
}
