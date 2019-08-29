import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {CustomersComponent} from './customers/customers.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {RolesComponent} from './users/roles/roles.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {MatListModule, MatToolbarModule, MatSidenavModule, MatIconModule} from '@angular/material';
import {AdminComponent} from './admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, ModalModule} from 'ngx-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import {PlatformsFilterPipe} from './platforms/platforms-filter.pipe';
import {CustomersFPipe} from './customers/customers-f.pipe';
import {PlatformsComponent} from './platforms/platforms.component';
import { BrandsComponent } from './brands/brands.component';
import {BrandsFilterPipe} from './brands/brands-filter.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AdminComponent,
    OrdersComponent,
    ProductsComponent,
    RolesComponent,
    UsersComponent,
    HomeComponent,
    CustomersComponent,
    SidebarComponent,
    PlatformsFilterPipe,
    CustomersFPipe,
    PlatformsComponent,
    BrandsComponent,
    BrandsFilterPipe,


  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()

  ]
})
export class AdminModule {
}
