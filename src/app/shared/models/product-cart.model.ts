import {ProductModel} from './product.model';

export class ProductCartModel {
  id: number;
  qty: number;
  product: ProductModel;
  isInStock: boolean;
}
