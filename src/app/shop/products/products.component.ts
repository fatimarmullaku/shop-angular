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
    {
      id: '4',
      title: 'Product 4',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '5',
      title: 'Product 5',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '6',
      title: 'Product 6',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '7',
      title: 'Product 7',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '8',
      title: 'Product 8',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '9',
      title: 'Product 9',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '10',
      title: 'Product 10',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '11',
      title: 'Product 11',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
    {
      id: '12',
      title: 'Product 12',
      image: '/assets/img/My-Cart/first-version/1.png',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
