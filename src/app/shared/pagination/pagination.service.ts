import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductService} from '../services/product.service';
import {ProductModel} from '../models/product.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private totalPagesSource = new BehaviorSubject(6);
  totalPages = this.totalPagesSource.asObservable();

  private pageSource = new BehaviorSubject(1);
  currentPage = this.pageSource.asObservable();

  constructor(private productService: ProductService) {
  }


  changePage(page: number) {
    this.pageSource.next(page);
  }


  changeTotalPages(totalpages: number) {
    this.totalPagesSource.next(totalpages);
  }
}
