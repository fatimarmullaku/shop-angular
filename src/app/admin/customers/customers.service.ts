import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  readonly getAll = ENDPOINTS.customers.getAll;
  readonly myAPI = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }


  getAllCustomers() {
    return this.http.get(this.myAPI + '/customers');
  }

  registerCustomer(values) {
    console.log('from service', values);
    return this.http.post(this.myAPI + '/', values);
  }

  deleteCostumer(id) {
    console.log('from service', id);
    return this.http.delete(this.myAPI + '/customers/' + id);
  }

  updateCustomer(data) {
    console.log('from service', data);
    return this.http.put(this.myAPI + '/', data);
  }


}
