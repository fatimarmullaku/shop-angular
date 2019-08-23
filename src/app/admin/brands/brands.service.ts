import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  // readonly getAll = ENDPOINTS.customers.getAll;
  readonly rootUrl = 'http://localhost:8080/api/v1/brand';

  constructor(private http: HttpClient) {
  }

  getAllBrands() {
    return this.http.get(this.rootUrl);
  }

  registerBrand(data) {
    console.log('from service', data);
    return this.http.post(this.rootUrl + '/', data);
  }

  deleteBrand(id) {
    console.log('from service', id);
    return this.http.delete(this.rootUrl + '/' + id);
  }

  updateBrand(data, bid) {
    console.log('from service', data, bid);
    return this.http.put(this.rootUrl + '/' + bid, data);

  }


  getBrandById(id) {
    return this.http.get(this.rootUrl + '/' + id);
  }
}
