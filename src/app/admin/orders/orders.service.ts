import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  readonly baseUrl = environment.apiHost;


  constructor(private http: HttpClient) {

  }

  paged() {
    const params = new HttpParams().set('size', String(20)).set('page', String(0));
    return this.http.get(this.baseUrl + '/invoices/history/paged', {params});
  }


}
