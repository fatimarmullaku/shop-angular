import { Component, OnInit } from '@angular/core';
import {PlatformsService} from '../platforms/platforms.service';
import {LocalStorageKey} from '../../shared/constants/local-storage-key';
import {HttpRequestMethod} from '../../shared/constants/http-request.method';
import {ENDPOINTS} from '../../shared/constants/api.constants';
import {BaseStorageService} from '../../shared/services/base-storage.service';
import {RestService} from '../../shared/services/rest.service';
import {ProductsService} from '../products/products.service';
import {StatsService} from '../orders/stats/stats.service';
import {OrdersService} from '../orders/orders.service';
import {OrderHistoryPagedModel} from '../orders/orders.model';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  orderCount: number;
  topProduct: string;
  constructor(private categoriesService: PlatformsService,
              private baseStorageService: BaseStorageService,
              private restService: RestService,
              private statsService: StatsService,
              private productService: ProductsService,
              private ordersService: OrdersService) { }

  ngOnInit() {
    this.fetchUser();
    this.loadAndCountProducts();
  }

  fetchUser(): void {
    const customerId = this.baseStorageService.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    this.restService.request<any>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll + `/${customerId}`).subscribe((res) => {
        this.username = res.name;
      },
      (err) => {
        console.log(err);
      });
  }
  loadAndCountProducts() {
/*    this.productService.getAllProducts().subscribe((products: any) => {
      if (products) {
        this.productCount = products.length;
      } else {
        this.productCount = 0;
      }
    });*/


      this.ordersService.pagedWithCustomParams(1, 1, '', 'customerName')
        .subscribe((response: OrderHistoryPagedModel[]) => {
          if (response.length >= 1) {
            this.orderCount = response[0].totalFilteredOrders;
          } else {
            this.orderCount = 0;
          }
        });
      this.statsService.getStats().subscribe((product: any) => {
      const prod = product;
      if (prod) {
        this.topProduct =  prod.topSoldItems[0].productname;
      } else {
        this.topProduct = 'No product sold';
      }

    });
  }
}
