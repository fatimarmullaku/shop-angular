import {Component, OnInit} from '@angular/core';
import {OrderModel} from './orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  om = new OrderModel('Agron',
    234,
    6456,
    '2019-08-22T15:53:37',
    23423.5,
    [{
      product_id: 1,
      name: 'Pes 2015',
      quantity: 2
    },
      {
        product_id: 1,
        name: 'Fifa 18',
        quantity: 2
      }
    ]);

  data = [
    this.om, this.om, this.om, this.om, this.om, this.om
  ];

  constructor() {

  }

  ngOnInit(): void {

  }

  parseDate(d: string){
    return new Date(d);
  }


}
