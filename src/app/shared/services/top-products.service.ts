import {RestService} from './rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {ENDPOINTS} from '../constants/api.constants';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {TopTenModel} from "../models/top-ten.model";

@Injectable({
  providedIn: 'root'
})
export class TopProductsService {

  constructor(private restService: RestService) {
  }

  // getTopSoldProducts(nrOfProducts: number) {
  //   return this.restService.publicRequest<any>(HttpRequestMethod.GET, ENDPOINTS.products.getTopSoldProducts, {
  //     params: {
  //       numberOfProducts: nrOfProducts
  //     }
  //   });
  // }

  getTopSoldProducts(nrOfProducts: number): Observable<TopTenModel[]> {
    return this.restService.publicRequest<any>(HttpRequestMethod.GET, ENDPOINTS.products.getTopSoldProducts, {
      params: {
        numberOfProducts: nrOfProducts
      }
    });
  }
}
