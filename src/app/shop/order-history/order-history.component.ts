import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../shared/models/product.model';
import {ProductCartModel} from '../../shared/models/product-cart.model';
import {ProductService} from '../../shared/services/product.service';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit {

  products: ProductModel[];
  cartProducts: ProductCartModel[];

  constructor(private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartProducts = this.cartService.getProductsFromCart();
  }

  // getProduct(id: number): ProductModel {
  //   return this.products.filter(item => item.id == id)[0];
  // }
}
