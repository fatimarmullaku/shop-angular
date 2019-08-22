import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseStorageService} from './base-storage.service';
import {ENDPOINTS} from '../constants/api.constants';
import {ProductCartModel} from '../models/product-cart.model';
import {CartService} from './cart.service';
import {UserService} from './user.service';
import {CustomerService} from './customer.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {PurchaseModel} from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {


  constructor(private httpClient: HttpClient,
              private localStorage: BaseStorageService,
              private cartService: CartService,
              private userService: UserService,
              private customerService: CustomerService) {
  }

  // second call
  buy(): any {
    // const purchaseObject = new PurchaseModel();
    // purchaseObject.customerId = customerId will be return from user.service
    // purchaseObject.invoiceId = this.cartService.getProductsFromCart();

    /*
          we call buy method which is in purchaseController server-side;
         this.HttpClient.post(ENDOPOINTS.cart.buy,purchaseObject)
     */
  }
}
