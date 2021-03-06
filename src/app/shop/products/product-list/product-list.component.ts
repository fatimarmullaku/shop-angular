import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {ProductService} from '../../../shared/services/product.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {ProductRatingModel} from '../../../shared/models/product-rating.model';
import {ProductReviewModel} from '../../../shared/models/product-review.model';
import {TopProductsService} from '../../../shared/services/top-products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  @Input()
  products: ProductModel[];
  productsList: ProductModel[];
  currentPage = 1;
  @Input()
  paginationService: PaginationService;
  pageSize = 8;


  constructor(private productService: ProductService,
              private topProducts: TopProductsService) {
  }

  ngOnInit() {
    /*    this.paginationService.currentPage.subscribe(res => {
          this.currentPage = res;
          this.getProductsPaged();
        });*/
    this.getTopProducts();
  }

  getProductsPaged() {
    this.productService.getProductsPaged(this.pageSize, this.currentPage - 1).subscribe((data: any) => {
      this.productsList = data.content;
      this.paginationService.changeTotalPages(data.totalPages);
      this.products = [];
      this.productsList.forEach(product => {
        const obj = new ProductModel();

        obj.id = product.id;
        obj.productDescription = 'Lorem ipsumlmlml';
        obj.fileName = product.fileName === null ? '/assets/img/bf4-cover.jpg' : product.fileName;
        obj.platform = {
          name: 'PC'
        };
        obj.unitPrice = product.unitPrice;
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

  getTopProducts() {
    this.topProducts.getTopSoldProducts(3).subscribe(res => {
      },
      error => {
        console.log(error);
      });
  }
}
