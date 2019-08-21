import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) {
  }

  /*
  * TODO: Request with token
  * */

  /*
  * TODO: Request without token (public)
  * */
}
