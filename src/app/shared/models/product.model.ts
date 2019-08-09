import {ProductReviewModel} from './product-review.model';

export class ProductModel {
  id: number;
  title: string;
  image: string;
  stock: number;
  price: number;
  description: string;
  platform: string;
  reviews: ProductReviewModel[];

  isInStock(): boolean {
    // if (this.stock > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
    return this.stock > 0;
  }
}
