import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductsSidebarComponent } from './products/products-sidebar/products-sidebar.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ProductListComponent,
    ProductsComponent,
    ProductsSidebarComponent,
    ProductItemComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,

  ]
})
export class ShopModule { }
