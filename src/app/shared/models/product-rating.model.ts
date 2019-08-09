import {ProductReviewModel} from './product-review.model';

export class ProductRatingModel {
  rated: number;
  totalRating = 5;
  totalReviews: number;
  reviews: ProductReviewModel[];
}
