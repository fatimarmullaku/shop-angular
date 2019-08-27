import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../shared/models/product.model';
import {ProductCartModel} from '../../../shared/models/product-cart.model';
import {CartService} from '../../../shared/services/cart.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';
import {StorageService} from '../../../shared/services/storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html'
})
export class CartPreviewComponent implements OnInit {

  // FormGroup
  loginForm: FormGroup;

  products: ProductModel[];
  cartProducts: ProductCartModel[];
  isModalActive = false;
  showRoute = true;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private storageService: StorageService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartProducts = this.cartService.getProductsFromCart();

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });

    const element = this.storageService.get(LocalStorageKey.ACCESS_TOKEN);
    if (element == null) {
      this.showRoute = false;
    }
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

  isProductInStock(product: ProductModel): boolean {
    return ProductModel.isInStock(product);
  }

  isLoginModalActive(): boolean {
    const element = this.storageService.get(LocalStorageKey.ACCESS_TOKEN);
    if (element == null) {
      this.isModalActive = true;
    }
    if (element != null) {
      this.isModalActive = false;
    }
    return this.isModalActive;
  }

  removeActiveClass() {
    this.isModalActive = !this.isModalActive;
  }

  onLoginFormSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.form.email.value,
        password: this.form.password.value
      };
      this.userService.login(payload.email, payload.password).subscribe(res => {
          this.router.navigateByUrl('/cart/shipping');
        },
        (err) => {
          console.error(err);
        });
    } else {
      alert('form not valid');
    }
  }

  continueShipping() {
    this.router.navigateByUrl('/cart/shipping');
  }

}
