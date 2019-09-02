import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  readonly rootUrl = ENDPOINTS.customers.getAll;

  constructor(private http: HttpClient) {
  }


  getAllCustomers() {
    return this.http.get(this.rootUrl + '/allActive');
  }

  registerCustomer(values) {
    return this.http.post(this.rootUrl, values);
  }

  deleteCostumer(id) {
    return this.http.delete(this.rootUrl + '/' + id);
  }

  updateCustomer(data, id) {
    return this.http.put(this.rootUrl + id, data);
  }


}
