import { Component, OnInit } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss']
})
export class ProductsSidebarComponent implements OnInit {
  productCategories = ['Category1', 'Category2', 'Category3', 'Category4'];
  productSort = ['Alphabetical A to Z', 'Alphabetical from Z to A', 'Most popular', 'Release date'];
  showFiller = false;

  constructor() { }

  ngOnInit() {
  }

  checked() {
    console.log('button is checked')
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
