import {Component, OnInit} from '@angular/core';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {OrderHistoryPagedModel} from '../../../admin/orders/orders.model';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  providers: [PaginationService]
})
export class OrderHistoryComponent implements OnInit {


  data = [];
  currentPage: number;
  pageSize = 3;

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
    this.orderService.paged(size, page).subscribe((response: OrderHistoryPagedModel[]) => {
      if (response.length >= 1) {
        this.data = response[0].filteredOrdersPage;
        this.paginationService.changeTotalPages(Math.ceil(response[0].totalFilteredOrders / this.pageSize));
      } else {
        this.paginationService.changeTotalPages(0);
        this.data = [];
      }
    });
  }

  parseDate(d: string) {
    return new Date(d);
  }
}
