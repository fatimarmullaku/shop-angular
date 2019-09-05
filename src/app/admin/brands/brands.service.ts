import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  readonly rootU = ENDPOINTS.brands.getAll;
  readonly rootUrl = '/api/v1/brand/';

  constructor(private http: HttpClient) {
  }

  getAllBrands() {
    return this.http.get(this.rootU);
  }

  registerBrand(data) {
    console.log('from service', data);
    return this.http.post(this.rootU, data);
  }

  deleteBrand(id) {
    console.log('from service', id);
    return this.http.delete(this.rootU + id);
  }

  updateBrand(data, bid) {
    console.log('from service', data, bid);
    return this.http.put(this.rootU + bid, data);

  }


  getBrandById(id) {
    return this.http.get(this.rootU + id);
  }
}
