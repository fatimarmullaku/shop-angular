import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../customers/customers.service';
import {OrdersService} from './orders.service';
import {CustomerModel} from '../customers/customer.model';
import {ProductModel} from '../../shared/models/product.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersList: OrdersModel;
  customersList: CustomerModel;
  productList: ProductModel;

  constructor(private ordersService: OrdersService,
              private customersModel: CustomerModel,
              private productModel: ProductModel) {

  }

  ngOnInit() {
    this.ordersService.getALlOrders().subscribe((data:any) => {
      this.ordersList = data;
    });
  }

}
