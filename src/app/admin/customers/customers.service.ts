import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  readonly rootUrl = 'http://localhost:3000';

  // readonly getAll = ENDPOINTS.customers.getAll;
  constructor(private http: HttpClient) {
  }


  getAllCustomers() {
    return this.http.get(this.rootUrl + '/customers');
  }

  registerCustomer(data) {
    return this.http.post(this.rootUrl + '/', data);
  }

  deleteCostumer(id) {
    return this.http.delete(this.rootUrl + '/', id);
  }

  updateCustomer(data) {
    return this.http.put(this.rootUrl + '/', data);
  }


}
