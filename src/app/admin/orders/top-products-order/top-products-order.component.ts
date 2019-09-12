import { Component, OnInit } from '@angular/core';
import {StatsService} from '../stats/stats.service';
import {ENDPOINTS} from '../../../shared/constants/api.constants';

@Component({
  selector: 'app-top-products-order',
  templateUrl: './top-products-order.component.html',
  styleUrls: ['./top-products-order.component.scss']
})
export class TopProductsOrderComponent implements OnInit {
  topSoldItemsArr = [];
  photoUrl = ENDPOINTS.products.getProductImage;
  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.getTopProducts();
  }
  getTopProducts() {
    this.statsService.getStats().subscribe((stDataResponse: any) => {
      this.topSoldItemsArr = stDataResponse.topSoldItems;
    });
  }
}
