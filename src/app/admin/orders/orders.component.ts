import {Component, OnInit} from '@angular/core';
import {OrderModel} from './orders.model';
import {OrdersService} from './orders.service';
import {PaginationService} from '../../shared/pagination/pagination.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }



}
