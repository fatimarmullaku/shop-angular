import {ProductRatingModel} from './product-rating.model';

export class ProductModel {
  id: number;
  name: string;
  fileName: string;
  unitPrice: number;
  productDescription: string;
  platform: PlatformModel;
  rating: ProductRatingModel;

  isWishlisted = false;


}
