import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  pageData = {
    tableName : 'Products',
    tableHead : ['Name','Record Status','Description','Category','Unit Price','inStock'],
  };
  products = [
    {  id: 1 ,
      name: 'Mortal Kombat 11' ,
      unitPrice: '29.00',
      inStock: '7',
      recordStatus : 'ACTIVE',
      description: 'Most popular game on UCX',
      category: 'PS4'
    },
    {  id: 2 ,
      name: 'Fifa 2019' ,
      unitPrice: '17.00',
      inStock: '4',
      recordStatus : 'INACTIVE',
      description: 'Most popular game on UCX',
      category: 'XBOX'
    },
    {  id: 3 ,
      name: 'Teken' ,
      unitPrice: '29.00',
      inStock: '7',
      recordStatus : 'INACTIVE',
      description: 'Most popular game on UCX',
      category: 'PS4'
    },
    {  id: 4 ,
      name: 'PES 2018' ,
      unitPrice: '26.00',
      inStock: '10',
      recordStatus : 'ACTIVE',
      description: 'Most popular game on UCX',
      category: 'XBOX'
    },
    {  id: 5 ,
      name: 'Need for speed rivals' ,
      unitPrice: '49.00',
      inStock: '15',
      recordStatus : 'ACTIVE',
      description: 'Most popular game on UCX',
      category: 'XBOX'
    },

    {  id: 6 ,
      name: 'Star Wars' ,
      unitPrice: '49.00',
      inStock: '15',
      recordStatus : 'ACTIVE',
      description: 'Ultimate edition',
      category: 'XBOX'
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
