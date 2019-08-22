import {ProductCartModel} from './product-cart.model';
import {PurchaseCartModel} from './purchase-cart.model';

export class PurchaseModel {
  customerId: number;
  cart: PurchaseCartModel[];
}
