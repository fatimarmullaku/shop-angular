import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly rootUrl = 'http://localhost:8080/shop/v1/products';


  constructor(private http: HttpClient) {
  }


  getAllProducts() {
    return this.http.get(this.rootUrl + '/allProducts');

  }

  registerProduct(data) {
    return this.http.post(this.rootUrl + '/', data);
  }

  deleteProduct(id) {
    return this.http.delete(this.rootUrl + '/Delete?id=' + id);
  }

  updateProduct(data) {
    return this.http.put(this.rootUrl + '/', data);
  }


}
