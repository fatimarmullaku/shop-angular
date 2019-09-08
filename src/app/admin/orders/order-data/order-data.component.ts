import {Component, OnInit, Input} from '@angular/core';
import {OrdersService} from '../orders.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {OrderHistoryPagedModel, OrderModel} from '../orders.model';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss'],
  providers: [PaginationService]
})
export class OrderDataComponent implements OnInit {
  searchOrder = '';
  searchBy = 'customerName';

  data: OrderModel[];
  currentPage: number;
  pageSize = 2;

  constructor(private ordersService: OrdersService,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.paginationService.changeTotalPages(9);
    this.paginationService.currentPage.subscribe(currentPage => {
      this.currentPage = currentPage;
      this.searchWithCustomParams();
    });
  }

  parseDate(d: string) {
    return new Date(d);
  }

  searchWithCustomParams() {
    this.ordersService.pagedWithCustomParams(this.pageSize, this.currentPage - 1, this.searchOrder, this.searchBy)
      .subscribe((response: OrderHistoryPagedModel[]) => {
        if (response.length >= 1) {
          this.data = response[0].filteredOrdersPage;
          this.paginationService.changeTotalPages(Math.ceil(response[0].totalFilteredOrders / this.pageSize));
        } else {
          this.paginationService.changeTotalPages(0);
          this.data = [];
        }
      });
  }

  resetPageAndMakeRequest() {
    this.paginationService.changePage(1);
  }

}
