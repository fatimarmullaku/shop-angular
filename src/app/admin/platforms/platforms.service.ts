import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  // readonly getAll = ENDPOINTS.customers.getAll;
  readonly rootUrl = 'api/v1/platforms';

  constructor(private http: HttpClient) {
  }

  getAllPlatforms() {
    return this.http.get(this.rootUrl );
  }

  registerPlatforms(values) {
    return this.http.post(this.rootUrl + '/', values);
  }

  deletePlatform(id) {
    return this.http.delete(this.rootUrl + '/' + id);
  }

  updatePlatform(data, cid) {
    return this.http.put(this.rootUrl + '/' + cid, data);

  }


}
