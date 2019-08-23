import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  readonly rootUrl = 'http://localhost:8080/api/v1/roles/';

  constructor(private http: HttpClient) {
  }

  registerRole(data) {
    console.log('from service', data)
    return this.http.post(this.rootUrl ,data);
  }

  getAllRoles() {
    return this.http.get(this.rootUrl );
  }


  updateRole(data, id) {
    console.log('from service', data, id)
    return this.http.put(this.rootUrl + id, data);
  }


  deleteRole(id) {
    console.log('from service', id)
    return this.http.delete(this.rootUrl + id);
  }
}
