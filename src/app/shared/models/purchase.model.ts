import {ProductCartModel} from './product-cart.model';

export class PurchaseModel {
  currentCustomerId: number;
  cartitems: ProductCartModel[];
}
