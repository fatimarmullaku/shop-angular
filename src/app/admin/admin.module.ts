import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BrandsComponent } from './brands/brands.component';
import {CategoriesComponent} from './categories/categories.component';
import {CustomersComponent} from './customers/customers.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {RolesComponent} from './roles/roles.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {MatListModule, MatToolbarModule, MatSidenavModule, MatIconModule} from '@angular/material';
import {DashboardBaseComponent} from "./layout/base/dashboard-base.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import { TablesDComponent } from '../shared/tables-d/tables-d.component';

@NgModule({
  declarations: [
    DashboardBaseComponent,
    BrandsComponent,
    CategoriesComponent,
    SideBarComponent,
    OrdersComponent,
    ProductsComponent,
    RolesComponent,
    UsersComponent,
    HomeComponent,
    CustomersComponent,
    TablesDComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,



  ]
})
export class AdminModule { }
