import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../../shared/models/product.model';
import {ProductService} from "../../../../shared/services/product.service";
import {CartService} from "../../../../shared/services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {ProductWishlistModel} from "../../../../shared/models/product-wishlist.model";
import {WishlistService} from "../../../../shared/services/wishlist.service";

@Component({
  selector: '[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {


  @Input()
  product: ProductModel;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private wishlistService: WishlistService,
              private cartService: CartService) { }

  ngOnInit() {
      this.productService.getProduct(this.product.id);
      this.wishlistService.getProductsFromWishlist();
  }

  isWishlisted(): boolean {
    return this.wishlistService.getProductInWishlist(this.product.id);
  }

  toggleWishlist() {
    if (this.isWishlisted()) {
      this.wishlistService.deleteFromWishlist(this.product.id);
      this.product.isWishlisted = false;
    } else {
      this.wishlistService.addToWishlist(this.product.id);
      this.product.isWishlisted = true;
    }
  }

  addToCart(event: any) {
    event.preventDefault();
    this.cartService.addToCart(this.product.id, 1);
  }
}
