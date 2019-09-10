import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  readonly rootUrl = ENDPOINTS.brands.getAll;

  constructor(private http: HttpClient) {
  }

  getAllBrands() {
    return this.http.get(this.rootUrl);
  }

  registerBrand(data) {
    return this.http.post(this.rootUrl, data);
  }

  deleteBrand(id) {
    return this.http.delete(this.rootUrl + id);
  }

  updateBrand(data, bid) {
    return this.http.put(this.rootUrl + bid, data);

  }

}
