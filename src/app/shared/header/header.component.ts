import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ProductCartModel} from '../models/product-cart.model';
import {CartService} from '../services/cart.service';
import {ProductModel} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {StorageService} from '../services/storage.service';
import {RestService} from '../services/rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {ENDPOINTS} from '../constants/api.constants';
import {BaseStorageService} from '../services/base-storage.service';
import {PaginationService} from '../pagination/pagination.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  photoUrl = ENDPOINTS.products.getProductImage;
  products: ProductModel[];
  cartProducts: ProductCartModel[];
  cartQty = 0;
  status = false;
  status2 = false;
  customerName: string;

  constructor(private userService: UserService,
              private cartService: CartService,
              private productService: ProductService,
              private storageService: StorageService,
              private restService: RestService,
              private baseStorageService: BaseStorageService,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartProducts = this.cartService.getProductsFromCart();
    this.getCartProducts();
    this.fetchCustomer();
  }

  getCartProducts() {
    this.cartService.getCartDataFromSubject().subscribe(
      result => {
        if (result) {
          this.cartQty = 0;
          const carts = result as Array<ProductCartModel>;
          carts.forEach(item => {
            this.cartQty += item.qty;
          });
        }
      }
    );
  }

  getProductsFromCart() {
    return this.cartService.getProductsFromCart();
  }


  toggleClass() {
    this.status = !this.status;
  }

  toggleClass2() {
    this.status2 = !this.status2;
  }

  isLoggedIn(): boolean {
    const element = this.storageService.get(LocalStorageKey.ACCESS_TOKEN);
    let isLogedIn = false;
    if (element != null) {
      isLogedIn = !isLogedIn;
    }
    return isLogedIn;
  }

  pageR() {
    this.paginationService.changePage(1);
  }

  fetchCustomer(): void {
    if(this.baseStorageService.getStorageOf(LocalStorageKey.CUSTOMER_ID) != null) {
      const customerId = this.baseStorageService.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
      if (customerId && customerId.length > 0) {
        this.restService.request<any>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll + `/${customerId}`)
          .subscribe((res) => {
              this.customerName = res.name;
              console.log(this.customerName);
            },
            (err) => {
              console.log(err);
            });
      }
    }
  }

}
