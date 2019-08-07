import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [
    {
      id: '1',
      title: 'Product 1 ',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '2',
      title: 'Product 2',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '3',
      title: 'Product 3',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
