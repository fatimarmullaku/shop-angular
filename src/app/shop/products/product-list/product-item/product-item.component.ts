import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../../shared/models/product.model';
import {ProductService} from '../../../../shared/services/product.service';
import {CartService} from '../../../../shared/services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {WishlistService} from '../../../../shared/services/wishlist.service';
import {ENDPOINTS} from '../../../../shared/constants/api.constants';

@Component({
  selector: '[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  productUrl = ENDPOINTS.products.getProductImage;


  @Input()
  item: ProductModel;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private wishlistService: WishlistService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.productService.getProduct(this.item.id);
    this.wishlistService.getProductsFromWishlist();
    if (this.isWishlisted()) {
      this.item.isWishlisted = true;
    } else {
      this.item.isWishlisted = false;
    }
  }

  isWishlisted(): boolean {
    return this.wishlistService.getProductInWishlist(this.item.id);
  }


  addToWishlist() {
    this.wishlistService.addToWishlist(this.item.id);
    this.item.isWishlisted = true;
  }

  removeFromWishlist() {
    this.wishlistService.deleteFromWishlist(this.item.id);
    this.item.isWishlisted = false;
  }


  addToCart(event: any) {
    event.preventDefault();
    this.cartService.addToCart(this.item.id, 1);
  }
}
