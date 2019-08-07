import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {CustomersComponent} from './customers/customers.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {RolesComponent} from './users/roles/roles.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {MatListModule, MatToolbarModule, MatSidenavModule, MatIconModule} from '@angular/material';
import {DashboardBaseComponent} from './layout/base/dashboard-base.component';
import { TablesDComponent } from '../shared/tables-d/tables-d.component';
import {PlatformsComponent} from './products/platforms/platforms.component';
import {PublishersComponent} from './products/publishers/publishers.component';

@NgModule({
  declarations: [
    DashboardBaseComponent,
    OrdersComponent,
    ProductsComponent,
    RolesComponent,
    UsersComponent,
    HomeComponent,
    CustomersComponent,
    TablesDComponent,
    PlatformsComponent,
    PublishersComponent
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
