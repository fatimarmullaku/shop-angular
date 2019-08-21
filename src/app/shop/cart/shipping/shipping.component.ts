import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html'
})
export class ShippingComponent implements OnInit {

  shippingForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
