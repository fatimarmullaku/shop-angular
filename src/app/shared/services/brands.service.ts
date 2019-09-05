import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  readonly rootU = ENDPOINTS.brands.getAll;
  readonly rootUrl = '/api/v1/brands/';

  constructor(private http: HttpClient) {
  }

  getAllBrands() {
    return this.http.get(this.rootU);
  }

  registerBrand(data) {
    console.log('from service', data);
    return this.http.post(this.rootUrl, data);
  }

  deleteBrand(id) {
    console.log('from service', id);
    return this.http.delete(this.rootUrl + id);
  }

  updateBrand(data, bid) {
    console.log('from service', data, bid);
    return this.http.put(this.rootUrl + bid, data);

  }


  getBrandById(id) {
    return this.http.get(this.rootUrl + id);
  }
}
