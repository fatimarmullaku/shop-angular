import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {CustomersComponent} from './customers/customers.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {RolesComponent} from './users/roles/roles.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {MatListModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatExpansionModule} from '@angular/material';
import {DashboardBaseComponent} from './layout/base/dashboard-base.component';
import {TablesDComponent} from '../shared/tables-d/tables-d.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, ModalModule} from 'ngx-bootstrap';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import {PlatformsFilterPipe} from './platforms/platforms-filter.pipe';
import {CustomersFPipe} from './customers/customers-f.pipe';
import {PlatformsComponent} from './platforms/platforms.component';
import { BrandsComponent } from './brands/brands.component';
import {BrandsFilterPipe} from './brands/brands-filter.pipe';
import {ProductsFPipe} from './products/products-f.pipe';
import {ShopModule} from '../shop/shop.module';
import { StatsComponent } from './orders/stats/stats.component';
import { FiltersComponent } from './shared/filters/filters.component';

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
    SidebarComponent,
    PlatformsFilterPipe,
    CustomersFPipe,
    PlatformsComponent,
    BrandsComponent,
    BrandsFilterPipe,
    ProductsFPipe,
    StatsComponent,
    FiltersComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatExpansionModule,
    ShopModule

  ]
})
export class AdminModule {
}
