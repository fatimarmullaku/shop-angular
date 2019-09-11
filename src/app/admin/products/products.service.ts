 import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LocalStorageKey} from '../../shared/constants/local-storage-key';
import {BaseStorageService} from '../../shared/services/base-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly rootUrl = 'api/v1/products/';

  resData: any;

  constructor(private http: HttpClient,
              private baseStorage: BaseStorageService
  ) {
  }

  getAllProducts(size: number, page: number) {
    const params = new HttpParams().set('size', String(size)).set('page', String(page));
    return this.http.get(this.rootUrl + 'allActive', {params});

  }

  getProductId(name) {
    return this.http.get(this.rootUrl + 'name/' + name);
  }

  registerProduct(data) {
    return this.http.post<any>(this.rootUrl, data);
  }

  uploadFiles(payload) {
    return this.http
      .post('/api/v1/upload/',
        payload
      );
  }

  updateProduct(data, id) {
    return this.http.put(this.rootUrl + id, data);
  }


  deleteProduct(id) {
    this.baseStorage.deleteElementInStorage(id, LocalStorageKey.CART);
    this.baseStorage.deleteElementInStorage(id, LocalStorageKey.WISHLIST);
    return this.http.delete(this.rootUrl + id);

  }
}
