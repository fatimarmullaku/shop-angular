import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../../shared/models/product.model';
import {ProductService} from '../../../../shared/services/product.service';
import {CartService} from '../../../../shared/services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {WishlistService} from '../../../../shared/services/wishlist.service';

@Component({
  selector: '[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {


  @Input()
  item: ProductModel;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private wishlistService: WishlistService,
              private cartService: CartService) { }

  ngOnInit() {
      this.productService.getProduct(this.item.id);
      this.wishlistService.getProductsFromWishlist();
  }

  isWishlisted(): boolean {
    return this.wishlistService.getProductInWishlist(this.item.id);
  }

  toggleWishlist() {
    if (this.isWishlisted()) {
      this.wishlistService.deleteFromWishlist(this.item.id);
      this.item.isWishlisted = false;
    } else {
      this.wishlistService.addToWishlist(this.item.id);
      this.item.isWishlisted = true;
    }
  }

  addToCart(event: any) {
    event.preventDefault();
    this.cartService.addToCart(this.item.id, 1);
  }
}
