import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  readonly rootUrl = 'http://localhost:8080/shop/v1/products';


  constructor(private http: HttpClient) {
  }


}
