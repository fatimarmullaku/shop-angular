import {ProductCartModel} from './product-cart.model';
import {PurchaseCartModel} from './purchase-cart.model';
import {AddressModel} from './address.model';

export class PurchaseModel {
  customerId: number;
  cart: PurchaseCartModel[];
  total: number;
  address: AddressModel;
}
