import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../shared/services/product.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input()
  products: ProductModel[];
  productsList: any;
  currentPage: number;

  constructor(private productService: ProductService,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.paginationService.currentPage.subscribe(currentPage => this.currentPage = currentPage);
    this.getProductsPaged();
  }

// hard-coded 9
  getProductsPaged() {
    this.productService.getProductsPaged(2, this.currentPage - 1).subscribe((data: any) => {
      this.productsList = data.content;
      this.paginationService.changeTotalPages(data.totalPages);
    });

  }

}
