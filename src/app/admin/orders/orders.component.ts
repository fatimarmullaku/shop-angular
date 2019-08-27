import {Component, OnInit} from '@angular/core';
import {OrderModel} from './orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  om = new OrderModel();

  data = [
    {customer: 'Drilon Gashi', title: 'PES12', time: '22:05AM'},
    {customer: 'Drilon Gashi', title: 'PES12', time: '22:05AM'},
    {customer: 'Drilon Gashi', title: 'PES12', time: '22:05AM'},
    {customer: 'Drilon Gashi', title: 'PES12', time: '22:05AM'}
  ];

  now: number;
  currentDate = new Date();

  constructor() {
    setInterval(() => {
      this.now = Date.now();
    });
  }

  ngOnInit(): void {
  }

}
