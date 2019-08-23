import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  // readonly getAll = ENDPOINTS.customers.getAll;
  readonly rootUrl = 'http://localhost:8080/api/v1/customers/';

  constructor(private http: HttpClient) {
  }


  getAllCustomers() {
    return this.http.get(this.rootUrl);
  }

  registerCustomer(values) {
    console.log('from service', values);
    return this.http.post(this.rootUrl, values);
  }

  deleteCostumer(id) {
    console.log('delte from service', id);
    return this.http.delete(this.rootUrl + id);
  }

  updateCustomer(data, id) {
    console.log('from service', data);
    return this.http.put(this.rootUrl + id, data);
  }


}
