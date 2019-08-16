import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../../shared/models/product.model';
import {ProductService} from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  product: ProductModel;

  constructor(public router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      if (res.id) {
        this.product = this.productService.getProduct(res.id);
      }
    });
  }

  isWishlisted(): boolean {
    return this.productService.getProductInWishlist(this.product.id);
  }

  toggleWishlist() {
    if (this.isWishlisted()) {
      this.productService.deleteFromWishlist(this.product.id);
      this.product.isWishlisted = false;
    } else {
      this.productService.addToWishlist(this.product.id);
      this.product.isWishlisted = true;
    }
  }

  addToCart(event: any) {
    event.preventDefault();

    this.productService.addToCart(this.product.id, 1);
  }
}
