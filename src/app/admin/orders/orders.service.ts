import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  readonly  rootUrl: "localhost:3000/orders"

  constructor(private http: HttpClient) {

  }


}
