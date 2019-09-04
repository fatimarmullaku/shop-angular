import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {
  @Input() orderData =  [];
  constructor() { }

  ngOnInit() {
  }
  parseDate(d: string) {
    return new Date(d);
  }
}
