import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShopRoutingModule} from './shop-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {NewPasswordComponent} from './auth/new-password/new-password.component';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductsComponent} from './products/products.component';
import {ProductsSidebarComponent} from './products/products-sidebar/products-sidebar.component';
import {ProductItemComponent} from './products/product-list/product-item/product-item.component';
import {ProductMenuComponent} from './products/product-list/product-menu/product-menu.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProductReviewsComponent} from './products/product-detail/product-reviews/product-reviews.component';
import {ProductGalleryComponent} from './products/product-detail/product-gallery/product-gallery.component';
import {AuthLayoutComponent} from './auth/auth-layout/auth-layout.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AdditionalInformationComponent} from './auth/additional-information/additional-information.component';
import {AddNewProductComponent} from './newproduct/add-new-product/add-new-product.component';
import {PaginationComponent} from '../shared/pagination/pagination.component';
import { AccountInfoComponent } from './cart/account-info/account-info.component';
import {ShippingComponent} from './cart/shipping/shipping.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SliderComponent } from './products/product-list/slider/slider.component';
import {CartPreviewComponent} from './cart/cart-preview/cart-preview.component';
import {PaymentMethodsComponent} from './cart/payment-methods/payment-methods.component';
import {VerificationComponent} from './cart/verification/verification.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ProductListComponent,
    ProductsComponent,
    ProductsSidebarComponent,
    ProductItemComponent,
    ProductMenuComponent,
    ProductDetailComponent,
    ProductReviewsComponent,
    ProductGalleryComponent,
    AuthLayoutComponent,
    LogoutComponent,
    AdditionalInformationComponent,
    AddNewProductComponent,
    PaginationComponent,
    CartPreviewComponent,
    AccountInfoComponent,
    ShippingComponent,
    WishlistComponent,
    SliderComponent,
    VerificationComponent,
    PaymentMethodsComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

  ]
})
export class ShopModule {
}
