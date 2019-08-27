import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../../shared/models/product.model';
import {ProductService} from '../../../shared/services/product.service';
import {CartService} from '../../../shared/services/cart.service';
import {WishlistService} from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  product: ProductModel;
  quantity: number;

  constructor(public router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private wishlistService: WishlistService) {
  }

  // fetchProductsPromise(){
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       this.productService.fetchProducts()
  //       resolve();
  //     }, 2000);
  //   });
  // }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      if (res.id) {
        this.productService.getProduct(res.id).subscribe(response => {
          this.product = response;
        });
      }
    });
  }

  getQuantity(event) {
    this.quantity = event.target.value;
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

  // addToWishlist(){
  //   this.wishlistService.addToWishlist(this.product.id);
  //   this.product.isWishlisted = true;
  // }
  // deleteFromWishlist(){
  //   this.wishlistService.deleteFromWishlist(this.product.id);
  //   this.product.isWishlisted = true;
  // }

  addToCart(event: any) {
    event.preventDefault();
    this.cartService.addToCart(this.product.id, Number(this.quantity));

  }
}
