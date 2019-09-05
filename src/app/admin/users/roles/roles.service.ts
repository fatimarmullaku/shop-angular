import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  readonly rootUrl = 'api/v1/roles/';

  constructor(private http: HttpClient) {
  }

  registerRole(data) {
    return this.http.post(this.rootUrl ,data);
  }

  getAllRoles() {
    return this.http.get(this.rootUrl );
  }


  updateRole(data, id) {
    return this.http.put(this.rootUrl + id, data);
  }


  deleteRole(id) {

    return this.http.delete(this.rootUrl + id);
  }
}
