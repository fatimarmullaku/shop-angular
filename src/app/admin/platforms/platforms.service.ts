import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ENDPOINTS } from 'src/app/shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  readonly rootUrl = ENDPOINTS.customers.getAll;
  // readonly rootUrl = 'http://localhost:8080/api/v1/platforms';

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


  getPlatformById(id) {
    return this.http.get(this.rootUrl + '/' + id);
  }


}
