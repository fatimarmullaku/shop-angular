import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../shared/services/product.service';
import {ProductRatingModel} from '../../../../shared/models/product-rating.model';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  rating: ProductRatingModel;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(res => {
      if (res.id) {
        this.rating = this.productService.getProduct(res.id).rating;
      }
    });
  }

  getRating(): {stars: number, half: boolean} {
    return {
      stars: Math.floor(this.rating.rated),
      half: this.rating.rated - Math.floor(this.rating.rated) > 0
    };
  }

}
