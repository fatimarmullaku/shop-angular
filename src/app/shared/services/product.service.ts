import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {StorageService} from './storage.service';
import {BaseStorageService} from './base-storage.service';
import {LocalStorageKey} from '../constants/local-storage-key';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {RestService} from './rest.service';
import {HttpRequestMethod} from '../constants/http-request.method';
import {ENDPOINTS} from '../constants/api.constants';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[] = [];

  constructor(private storageService: StorageService,
              private baseStorage: BaseStorageService,
              private http: HttpClient,
              private router: Router,
              private restService: RestService) {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.restService.publicRequest<ProductModel[]>(HttpRequestMethod.GET, ENDPOINTS.products.getAll).subscribe(res => {
        this.products = res;
      },
      (error) => {
        console.error(error);
      });
  }

  productsObservable(): Observable<ProductModel[]> {
    return this.restService.publicRequest<ProductModel[]>(HttpRequestMethod.GET, ENDPOINTS.products.getAll);
  }

  getProducts(): ProductModel[] {
    return this.products;
  }

  getProduct(id: number): ProductModel {
    const products = this.products.filter(item => item.id == id);
    if (products) {
      const product = products[0];
      // product.isWishlisted = this.getProductInWishlist(product.id);
      return product;
    }

    return null;
  }

  getProductObservable(id: number): Observable<ProductModel> {
    return this.productsObservable().pipe(
      map((response: ProductModel[]) => {
        console.log(response);
        return response.find(item => +item.id === +id);
      })
    );
  }

  // clear wishlist
  clearWishList() {
    this.baseStorage.clearStorageOf(LocalStorageKey.WISHLIST);
  }

  getProductsPaged(size: number, page: number, sort?: string) {
    const qParams = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.get(ENDPOINTS.products.getAll + '/paged', {headers, params: qParams});
  }

}
