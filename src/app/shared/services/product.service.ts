import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ProductReviewModel} from '../models/product-review.model';
import {ProductRatingModel} from '../models/product-rating.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[] = [];

  constructor() {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const product1 = new ProductModel();
    product1.id = 1;
    product1.description = 'Lorem ipsum';
    product1.image = '/assets/img/My-Cart/first-version/1.png';
    product1.platform = 'PC';
    product1.price = 20;
    product1.stock = 2;
    product1.title = 'Mortal Combat';

    const product1Rating = new ProductRatingModel();
    product1Rating.rated = 3.5;
    product1Rating.totalReviews = 49;

    const product1Review = new ProductReviewModel();
    product1Review.id = 1;
    product1Review.description = 'Test review description';
    product1Review.stars = 2;
    product1Review.name = 'John Doe';
    product1Rating.reviews = [product1Review];

    product1.rating = product1Rating;

    this.products = [product1];
  }

  getProducts(): ProductModel[] {
    return this.products;
  }

  getProduct(id: number): ProductModel {
    const product = this.products.filter(item => item.id == id);
    if (product) {
      return product[0];
    }

    return null;
  }
}
