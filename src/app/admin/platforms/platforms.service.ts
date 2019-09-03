import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  // readonly getAll = ENDPOINTS.customers.getAll;
  readonly rootUrl = 'http://localhost:8080/api/v1/platforms';

  constructor(private http: HttpClient) {
  }

  getAllPlatforms() {
    return this.http.get(this.rootUrl );
  }

  registerPlatforms(values) {
    console.log('from service', values);
    return this.http.post(this.rootUrl + '/', values);
  }

  deletePlatform(id) {
    console.log('from service', id);
    return this.http.delete(this.rootUrl + '/' + id);
  }

  updatePlatform(data, cid) {
    console.log('from service', data, cid);
    return this.http.put(this.rootUrl + '/' + cid, data);

  }


  getPlatformById(id) {
    return this.http.get(this.rootUrl + '/' + id);
  }


}
