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

  paged(size: number, page: number) {
    const params = new HttpParams().set('size', String(size)).set('page', String(page));
    return this.http.get(this.baseUrl + '/invoices/history/paged', {params});
  }

  pagedWithCustomParams(size: number, searchText, paramSearch) {
    const params = new HttpParams().set('size', String(size)).set('page', String('0')).set(paramSearch, String(searchText));
    return this.http.get(this.baseUrl + '/invoices/history/paged', {params});
  }



}
