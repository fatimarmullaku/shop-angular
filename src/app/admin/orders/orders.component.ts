import {Component, OnInit} from '@angular/core';
import {OrderModel} from './orders.model';
import {OrdersService} from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  data = [];

  constructor(private ordersService: OrdersService) {

  }

  ngOnInit(): void {
    this.ordersService.paged().subscribe((orders: OrderModel[]) => {
      this.data = orders;
    });

  }

  parseDate(d: string) {
    return new Date(d);
  }


}
