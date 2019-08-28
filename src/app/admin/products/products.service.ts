import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly rootUrl = 'http://localhost:8080/api/v1/products/';

  resData: any;

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get(this.rootUrl + 'allActive');

  }

  getProductId(name) {
    return this.http.get(this.rootUrl + 'name/' + name);
  }

  registerProduct(data) {
    return this.http.post<any>(this.rootUrl, data);
  }

  uploadFiles(payload) {
    this.http
      .post('http://localhost:8080/api/v1/upload/',
        payload
      ).subscribe((data: any) => {
      this.resData = data;
      console.log(this.resData);
    });
  }

  updateProduct(data, id) {
    console.log(data);
    return this.http.put(this.rootUrl + `${id}`, data);
  }


  deleteProduct(id) {
    return this.http.delete(this.rootUrl + id);
  }
}
