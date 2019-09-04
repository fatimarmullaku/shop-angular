import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  baseUrl = environment.apiHost;
  constructor(private http: HttpClient) { }

  // http://localhost:8080/api/v1/invoices/stats
  getStats() {
    return this.http.get(`${this.baseUrl}/invoices/stats`);
  }
}
