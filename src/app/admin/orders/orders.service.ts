import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  readonly  rootUrl = 'http://localhost:8080/api/v1/invoices'
  constructor(private http: HttpClient) {

  }

  getALlOrders() {
    return this.http.get(this.rootUrl );
  }


  getById() {
    return this.http.get(this.rootUrl + '/lineitems/{id}');
  }
}
