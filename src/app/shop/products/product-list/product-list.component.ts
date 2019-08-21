import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input()
  products: ProductModel[];
  productsList: any;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
  }

  getProductsPaged(size: number, page: number, sort?: string) {
    this.productService.getProductsPaged(size, page, sort).subscribe((data: any) => {
      this.productsList = data;
      console.log(this.productsList);
    });


  }

}
