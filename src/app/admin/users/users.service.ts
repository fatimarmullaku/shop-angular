import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly rootUrl = '';

  constructor(private http: HttpClient) {
  }

  registerUser(data) {
    return this.http.post(this.rootUrl + '/', data);
  }

  getAllUsers() {
    return this.http.get(this.rootUrl + '/allProducts');
  }


  updateUser(data) {
    return this.http.put(this.rootUrl + '/', data);
  }


  deleteUser(id) {
    return this.http.post(this.rootUrl + '/', id);
  }


}
