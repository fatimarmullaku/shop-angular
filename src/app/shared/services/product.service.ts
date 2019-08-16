import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ProductReviewModel} from '../models/product-review.model';
import {ProductRatingModel} from '../models/product-rating.model';
import {StorageService} from './storage.service';
import {ProductCartModel} from '../models/product-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[] = [];

  constructor(private storageService: StorageService) {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const product1 = new ProductModel();
    product1.id = 1;
    product1.description = 'Lorem ipsum';
    product1.image = '/assets/img/injustice-cover.jpg';
    product1.platform = 'PC';
    product1.price = 20;
    product1.stock = 2;
    product1.title = 'Injustice 2';
    const product1Rating = new ProductRatingModel();
    product1Rating.rated = 3.5;
    product1Rating.totalReviews = 49;
    const product1Review = new ProductReviewModel();
    product1Review.id = 1;
    product1Review.description = 'Test review description';
    product1Review.stars = 2;
    product1Review.name = 'John Doe';
    product1Rating.reviews = [product1Review];
    product1.rating = product1Rating;
    this.products.push(product1);
    const product2 = new ProductModel();

    product2.id = 2;
    product2.description = 'Lorem ipsum';
    product2.image = '/assets/img/cod-cover.jpg';
    product2.platform = 'PC';
    product2.price = 20;
    product2.stock = 2;
    product2.title = 'Call of Du2y Modern Warfare';
    const product2Rating = new ProductRatingModel();
    product2Rating.rated = 4.5;
    product2Rating.totalReviews = 49;
    const product2Review = new ProductReviewModel();
    product2Review.id = 2;
    product2Review.description = 'Test review description';
    product2Review.stars = 2;
    product2Review.name = 'John Doe';
    product2Rating.reviews = [product2Review];
    product2.rating = product2Rating;
    this.products.push(product2);

    const product3 = new ProductModel();
    product3.id = 3;
    product3.description = 'Lorem ipsum';
    product3.image = '/assets/img/jump-force-cover.jpg';
    product3.platform = 'PC';
    product3.price = 20;
    product3.stock = 2;
    product3.title = 'Jump Force';
    const product3Rating = new ProductRatingModel();
    product3Rating.rated = 4.5;
    product3Rating.totalReviews = 49;
    const product3Review = new ProductReviewModel();
    product3Review.id = 3;
    product3Review.description = 'Test review description';
    product3Review.stars = 2;
    product3Review.name = 'John Doe';
    product3Rating.reviews = [product3Review];
    product3.rating = product3Rating;
    this.products.push(product3);
  }
  getProducts(): ProductModel[] {
    return this.products;
  }


  getProduct(id: number): ProductModel {
    const products = this.products.filter(item => item.id == id);
    if (products) {
      const product = products[0];
      product.isWishlisted = this.getProductInWishlist(product.id);
      return product;
    }

    return null;
  }

  getProductInWishlist(id: number): boolean {
    const wishlist = this.storageService.get('wishlist');
    if (wishlist) {
      return JSON.parse(wishlist).filter(item => item == id).length > 0;
    } else {
      return false;
    }
  }

  // add to wishlist
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
    const wishlist = this.storageService.get('wishlist');
    if (wishlist) {
      const wishlistArray = JSON.parse(wishlist).filter(item => item != id);
      this.storageService.set('wishlist', JSON.stringify(wishlistArray));
    }
  }

  // clear wishlist
  clearWishList() {
    this.storageService.delete('wishlist');
  }

  getProductsFromCart(): ProductCartModel[] {
    const storage = this.storageService.get('cart');
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
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
    this.storageService.set('cart', JSON.stringify(cart));
  }

  deleteFromCart(id: number) {
    const cart = this.getProductsFromCart().filter(item => item.id != id);

    // save
    this.storageService.set('cart', JSON.stringify(cart));
  }

  changeProductCartQuantity(id: number, quantity: number) {
    const cart = this.getProductsFromCart().map(item => {
      if (item.id == id) {
        item.qty = quantity;
      }

      return item;
    });

    // save
    this.storageService.set('cart', JSON.stringify(cart));
  }
}
