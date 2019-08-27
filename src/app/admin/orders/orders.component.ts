import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  data = [
    {customer: 'Drilon Gashi', title: 'PES12', time: '22:05AM'}
  ];

  now:number;
  currentDate = new Date();

  constructor() {
    setInterval(() => {this.now = Date.now();});
  }

  ngOnInit() {
  }

}
