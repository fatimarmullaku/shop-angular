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

  onProductsLinkClick(type: string) {
    if (type === 'reviews') {
      this.router.navigateByUrl('/products/' + this.product.id + '/reviews', {state: {data: this.product}});
    } else {
      this.router.navigateByUrl('/products/' + this.product.id, {state: {data: this.product}});
    }
  }

}
