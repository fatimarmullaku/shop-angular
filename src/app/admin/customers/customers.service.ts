import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  readonly getAll = ENDPOINTS.customers.getAll;

  constructor(private http: HttpClient) {
  }


  getAllCustomers() {
    return this.http.get(this.getAll);
  }

  registerCustomer(data) {
    return this.http.post(this.getAll + '/', data);
  }

  deleteCostumer(id) {
    return this.http.delete(this.getAll + '/', id);
  }

  updateCustomer(data) {
    return this.http.put(this.getAll + '/', data);
  }


}
