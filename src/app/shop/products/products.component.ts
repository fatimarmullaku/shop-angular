import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ProductModel} from '../../shared/models/product.model';
import {ProductsService} from './products.service';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductModel[];

  constructor(private productService: ProductService,
              private productsService: ProductsService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    console.log('from products', this.products);
  }

  onFilterChange(event: any) {
    this.productsService.getProductByPlatformAndBrand(event).subscribe(res => {
      this.products = res;
    });
  }

  removeActiveClass() {
    this.userService.justSignUp = !this.userService.justSignUp;
  }
}


