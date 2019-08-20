import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // readonly getAll = ENDPOINTS.customers.getAll;
  readonly rootUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }


  getAllCategoies() {
    return this.http.get(this.rootUrl + '/categories');
  }

  registerCategory(values) {
    console.log('from service', values);
    return this.http.post(this.rootUrl + '/register', values);
  }

  deleteCategory(id) {
    console.log('from service', id);
    return this.http.delete(this.rootUrl + '/category/' + id);
  }

  updateCategory(data) {
    console.log('from service', data);
    return this.http.put(this.rootUrl + '/', data);

  }



}
