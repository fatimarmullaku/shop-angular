import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  data = [
    {customer: 'Drilon Gashi', title: 'PES12', time: '22:05AM'},
    {customer: 'Faton Podrimqaku', title: 'NEED FOR SPEED 12', time: '13:15AM'},
    {customer: 'Enis Rasimi', title: 'Call of Duty', time: '17:05AM'},
    {customer: 'Fati Murmallaku', title: 'PES12', time: '22:05AM'},
    {customer: 'Pashtrik Gashi', title: 'NEED FOR SPEED 12', time: '13:15AM'},
    {customer: 'Durim Gashi', title: 'Call of Duty', time: '17:05AM'},
  ];

  now:number;
  currentDate = new Date();

  constructor() {
    setInterval(() => {this.now = Date.now();});
  }

  ngOnInit() {
  }

}
