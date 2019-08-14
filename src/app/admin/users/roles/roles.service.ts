import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  readonly rootUrl = 'localhost:8089/shop/v1';

  constructor(private http: HttpClient) {
  }

  registerRole(data) {
    return this.http.post(this.rootUrl + '/', data);
  }

  getAllRoles() {
    return this.http.get(this.rootUrl + '/');
  }


  updateRole(data) {
    return this.http.put(this.rootUrl + '/', data);
  }


  deleteRole(id) {
    return this.http.post(this.rootUrl + '/', id);
  }
}
