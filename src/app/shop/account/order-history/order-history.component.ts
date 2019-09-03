import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../../../admin/orders/orders.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {OrderModel} from '../../../admin/orders/orders.model';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit {


  data = [];
  currentPage: number;
  pageSize = 2;

  constructor(private orderService: OrderService,
              private paginationService: PaginationService) {

  }

  ngOnInit(): void {
    this.paginationService.changeTotalPages(9);
    this.paginationService.currentPage.subscribe(currentPage => {
      this.getOrderHistoryPaged(this.pageSize, currentPage - 1);
      this.currentPage = currentPage;
    });
  }

  getOrderHistoryPaged(size: number, page: number) {
    this.orderService.paged(size, page).subscribe((orders: OrderModel[]) => {
      this.data = orders;
    });
  }

  parseDate(d: string) {
    return new Date(d);
  }
}
