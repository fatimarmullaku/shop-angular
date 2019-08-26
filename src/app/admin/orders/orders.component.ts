import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  data = [
    {title: 'Counter Strike'},
    {title: 'PES 12'},
    {title: 'NEED FOR SPEED 12'},
    {title: 'Call of Duty '},
    {time: '22:05AM'},
    {time: '13:15AM'},
    {time: '17:05AM'},
    {time: '22:25AM'},
    {time: '24:35AM'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
