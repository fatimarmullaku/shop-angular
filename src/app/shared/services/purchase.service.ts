import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseStorageService} from './base-storage.service';
import {CartService} from './cart.service';
import {UserService} from './user.service';
import {CustomerService} from './customer.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {RestService} from './rest.service';
import {PurchaseModel} from '../models/purchase.model';
import {HttpRequestMethod} from '../constants/http-request.method';
import {ENDPOINTS} from '../constants/api.constants';
import {PurchaseCartModel} from '../models/purchase-cart.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {


  constructor(private httpClient: HttpClient,
              private baseStorage: BaseStorageService,
              private cartService: CartService,
              private userService: UserService,
              private customerService: CustomerService,
              private restService: RestService) {
  }

  // second call
  buy() {
    const purchaseModel = new PurchaseModel();
    purchaseModel.cart = [];
    purchaseModel.customerId = this.baseStorage.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    //const address = this.baseStorage.getStorageOf(LocalStorageKey.SHIPPING_ADDRESS_ID);

    // if (address) {
    //   purchaseModel.address = address;
    // }
    purchaseModel.total = this.cartService.generateTotalPrice();
    const prod = this.cartService.getProductsFromCart();
    prod.forEach(value => {
      const modelenzi = new PurchaseCartModel();
      modelenzi.productId = value.id;
      modelenzi.quantity = value.qty;
      purchaseModel.cart.push(modelenzi);
    });
    return this.restService.publicRequest(HttpRequestMethod.POST, ENDPOINTS.purchases.buy, {
      body: purchaseModel
    });
  }
}
