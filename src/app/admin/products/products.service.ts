import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly rootUrl = 'http://localhost:8080/api/v1/products/';


  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get(this.rootUrl + 'allActive');

  }

  getProductId(name)
  {
    return this.http.get(this.rootUrl + "name/" + name);
  }

  registerProduct(data) {
    return this.http.post(this.rootUrl , data);
  }

  deleteProduct(id) {
    return this.http.delete(this.rootUrl +id);
  }

  updateProduct(data, id) {
    console.log('from service', data, id)
    return this.http.put(this.rootUrl + id, data);
  }


}
