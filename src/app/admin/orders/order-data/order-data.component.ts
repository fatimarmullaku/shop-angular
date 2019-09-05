import { Component, OnInit, Input } from '@angular/core';
import {OrdersService} from '../orders.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {OrderModel} from '../orders.model';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {
  searchOrder: string;
  searchBy = 'customerName';

  data = [];
  currentPage: number;
  pageSize = 2;
  pageSizeOnFilter = 10;

  constructor(private ordersService: OrdersService,
              private paginationService: PaginationService) { }

  ngOnInit() {
    this.paginationService.changeTotalPages(9);
    this.paginationService.currentPage.subscribe(currentPage => {
      this.getOrderHistoryPaged(this.pageSize, currentPage - 1);
      this.currentPage = currentPage;
    });
  }

  getOrderHistoryPaged(size: number, page: number) {
    this.ordersService.paged(size, page).subscribe((orders: OrderModel[]) => {
      this.data = orders;
    });
  }

  parseDate(d: string) {
    return new Date(d);
  }
  searchWithCustomParams() {
    this.ordersService.pagedWithCustomParams(this.pageSizeOnFilter, this.searchOrder, this.searchBy).subscribe((orders: OrderModel[]) => {
      this.data = orders;
    });
  }

}
