import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseStorageService} from "./base-storage.service";
import {ENDPOINTS} from "../constants/api.constants";
import {ProductCartModel} from "../models/product-cart.model";
import {CartService} from "./cart.service";
import {UserService} from "./user.service";
import {CustomerService} from "./customer.service";
import {LocalStorageKey} from "../constants/local-storage-key";
import {PurchaseModel} from "../models/purchase.model";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  cartItems: ProductCartModel[];

  constructor(private httpClient: HttpClient,
              private localStorage: BaseStorageService,
              private cartService: CartService,
              private userService: UserService,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.cartItems = this.cartService.getProductsFromCart();
  }

  //second call
  buy(): any {
    //customer id should be taken from accestoken (decode accesToken first);w


    //this is generated Invoice Id from backend
    let invoiceID = this.addToCart();

    // const purchaseObject = new PurchaseModel();
    // purchaseObject.customerId = customerId which will be taken from access Token;
    // purchaseObject.invoiceId = this.addToCart();

    // we call buy method which is in purchaseController server-side;

   /*
        this.HttpClient.post(ENDOPOINTS.cart.buy,purchaseObject)
    */
  }

  //first call
  addToCart(): number {
    /*
        // this will return generated Invoice Id
       return this.HttpClient.post(ENDPOINTS.cart.addTocart,this.cartItems);

     */
    return 1;
  }

}
