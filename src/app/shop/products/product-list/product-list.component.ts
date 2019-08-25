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
  pageSize = 6;

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
    this.productService.getProductsPaged(this.pageSize, this.currentPage - 1).subscribe((data: any) => {
      this.productsList = data.content;
      this.paginationService.changeTotalPages(data.totalPages);
      this.products = [];
      this.productsList.forEach(product => {
        const obj = new ProductModel();

        obj.id = product.id;
        obj.description = 'Lorem ipsumlmlml';
        obj.fileName = product.fileName === null ? '/assets/img/bf4-cover.jpg' : '/assets/img/' + product.fileName;
        obj.platform = 'PC';
        obj.unitPrice = product.unitPrice;
        obj.inStock = 2;
        obj.name = product.name;
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
