import {ProductRatingModel} from './product-rating.model';
import {PublisherModel} from "./publisher.model";

export class ProductModel {
  id: number;
  title: string;
  image: string;
  stock: number;
  price: number;
  description: string;
  platform: string;
  rating: ProductRatingModel;

  isWishlisted = false;

  isInStock(): boolean {
    // if (this.stock > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
    return this.stock > 0;
  }
}
