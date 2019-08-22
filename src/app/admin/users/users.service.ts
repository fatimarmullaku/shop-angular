import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly rootUrl = 'http://localhost:8080/api/v1/roles/';

  constructor(private http: HttpClient) {
  }

  registerUser(data) {
    return this.http.post(this.rootUrl , data);
  }

  getAllUsers() {
    return this.http.get(this.rootUrl );
  }


  updateUser(data, id) {
    console.log("from service", id)
    return this.http.put(this.rootUrl + id, data);
  }


  deleteUser(id) {
    return this.http.delete(this.rootUrl + id);
  }


}
