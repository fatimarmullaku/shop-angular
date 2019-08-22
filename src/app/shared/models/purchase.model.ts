import {ProductCartModel} from './product-cart.model';

export class PurchaseModel {
  customerId: number;
  cartitems: ProductCartModel[];
}
