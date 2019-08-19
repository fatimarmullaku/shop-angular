import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {



  // readonly getAll = ENDPOINTS.customers.getAll;
  readonly rootUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }


  getAllCustomers() {
    return this.http.get(this.rootUrl + '/customers');
  }

  registerCustomer(values) {
    console.log('from service', values);
    return this.http.post(this.rootUrl + '/', values);
  }

  deleteCostumer(id) {
    console.log('from service', id);
    return this.http.delete(this.rootUrl + '/customers/' + id);
  }

  updateCustomer(data) {
    console.log('from service', data);
    return this.http.put(this.rootUrl + '/', data);

  }


}
