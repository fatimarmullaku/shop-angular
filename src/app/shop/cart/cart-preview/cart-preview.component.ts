import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../shared/models/product.model';
import {ProductCartModel} from '../../../shared/models/product-cart.model';
import {CartService} from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html'
})
export class CartPreviewComponent implements OnInit {

  products: ProductModel[];
  cartProducts: ProductCartModel[];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartProducts = this.cartService.getProductsFromCart();
  }

  getProduct(id: number): ProductModel {
    return this.products.filter(item => item.id == id)[0];
  }

  addQty(cartProduct: ProductCartModel) {
    this.cartService.changeProductCartQuantity(cartProduct.id, cartProduct.qty + 1);
    this.cartProducts = this.cartService.getProductsFromCart();
  }

  subQty(cartProduct: ProductCartModel) {
    if (cartProduct.qty - 1 < 1) {
      return;
    }

    this.cartService.changeProductCartQuantity(cartProduct.id, cartProduct.qty - 1);
    this.cartProducts = this.cartService.getProductsFromCart();
  }

  deleteFromCart(cartProduct: ProductCartModel) {
    this.cartService.deleteFromCart(cartProduct.id);
    this.cartProducts = this.cartService.getProductsFromCart();
  }
}
