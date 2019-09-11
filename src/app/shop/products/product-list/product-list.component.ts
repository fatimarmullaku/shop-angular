import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input()
  products: ProductModel[];
  currentPage = 1;
  @Input()
  paginationService: PaginationService;
  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {

  }

}
