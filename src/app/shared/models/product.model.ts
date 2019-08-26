import {ProductRatingModel} from './product-rating.model';

export class ProductModel {
  id: number;
  name: string;
  fileName: string;
  inStock: number;
  unitPrice: number;
  description: string;
  platform: PlatformModel;
  rating: ProductRatingModel;
  inStockState = this.isInStock();

  isWishlisted = false;

  static isInStock(product: ProductModel): boolean {
    return product.inStock > 0;
  }

  isInStock(): boolean {
    // if (this.stock > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
    return this.inStock > 0;
  }


}
