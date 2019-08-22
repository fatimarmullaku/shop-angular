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
import {DashboardBaseComponent} from './layout/base/dashboard-base.component';
import {TablesDComponent} from '../shared/tables-d/tables-d.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {PlatformsComponent} from './products/platforms/platforms.component';
import {PublishersComponent} from './products/publishers/publishers.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';


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
    PublishersComponent,
    SidebarComponent,
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


  ]
})
export class AdminModule {
}
