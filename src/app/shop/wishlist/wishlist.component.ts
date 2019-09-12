import {Component, OnInit} from '@angular/core';
import {WishlistService} from '../../shared/services/wishlist.service';
import {ProductWishlistModel} from '../../shared/models/product-wishlist.model';
import {ProductModel} from '../../shared/models/product.model';
import {ProductService} from '../../shared/services/product.service';
import {CartService} from '../../shared/services/cart.service';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {


  product: ProductModel;
  wishlistProducts: ProductWishlistModel[];
  productUrl = ENDPOINTS.products.getProductImage;

  constructor(private productService: ProductService,
              private wishlistService: WishlistService,
              private cartService: CartService) {
  }
  ngOnInit() {
    this.productService.getProducts();
    this.wishlistProducts = this.wishlistService.getProductsFromWishlist();
  }

  deleteFromWishlist(wishlistProduct: ProductWishlistModel) {
    this.wishlistService.deleteFromWishlist(wishlistProduct.id);
    this.wishlistProducts = this.wishlistService.getProductsFromWishlist();
  }


  addToCart(prod: ProductModel, event: any) {
    event.preventDefault();
    this.cartService.addToCart(prod.id, 1);
  }

}
