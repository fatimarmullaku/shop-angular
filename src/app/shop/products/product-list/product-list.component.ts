import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../shared/services/product.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {ProductRatingModel} from '../../../shared/models/product-rating.model';
import {ProductReviewModel} from '../../../shared/models/product-review.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input()
  products: ProductModel[];
  productsList: any[];
  currentPage: number;

  constructor(private productService: ProductService,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.paginationService.currentPage.subscribe(currentPage => {
      this.currentPage = currentPage;
      this.getProductsPaged();
    });
    // this.getProductsPaged();
  }

// hard-coded 9
  getProductsPaged() {
    this.productService.getProductsPaged(2, this.currentPage - 1).subscribe((data: any) => {
      this.productsList = data.content;
      this.paginationService.changeTotalPages(data.totalPages);
      this.products = [];
      this.productsList.forEach(product => {
        const obj = new ProductModel();

        obj.id = 1;
        obj.description = 'Lorem ipsumlmlml';
        obj.image = '/assets/img/bf4-cover.jpg';
        obj.platform = 'PC';
        obj.price = product.unitPrice;
        obj.stock = 2;
        obj.title = product.name;
        const objRating = new ProductRatingModel();
        objRating.rated = 4.5;
        objRating.totalReviews = 49;
        const objReview = new ProductReviewModel();
        objReview.id = 1;
        objReview.description = 'Test review description';
        objReview.stars = 2;
        objReview.name = 'John Doe';
        objRating.reviews = [objReview];
        obj.rating = objRating;

        this.products.push(obj);
      });
    });

  }


}
