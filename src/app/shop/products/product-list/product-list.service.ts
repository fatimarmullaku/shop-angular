import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../shared/models/product.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  lastPageIndex = 6;
  pageSize: number;
  products: ProductModel[];
  productsList: any;

  private totalPagesSource = new BehaviorSubject(1);
  totalPages = this.totalPagesSource.asObservable();

  private pageSource = new BehaviorSubject(1);
  currentPage = this.pageSource.asObservable();

  constructor(private productService: ProductService) {
  }


  changePage(page: number) {
    this.pageSource.next(page);
  }


  changeTotalItems(totalItems: number) {
    this.pageSource.next(totalItems);
  }
}
