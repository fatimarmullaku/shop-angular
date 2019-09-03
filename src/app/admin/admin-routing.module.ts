import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {UsersComponent} from './users/users.component';
import {ProductsComponent} from './products/products.component';
import {RolesComponent} from './users/roles/roles.component';
import {CustomersComponent} from './customers/customers.component';
import {DashboardBaseComponent} from './layout/base/dashboard-base.component';
import {PlatformsComponent} from './platforms/platforms.component';
import {BrandsComponent} from './brands/brands.component';
import {AdminAuthGuardService} from '../shared/services/guards/admin-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardBaseComponent,
    canActivate: [AdminAuthGuardService],
    children: [
      {path: '', component: HomeComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'roles', component: RolesComponent},
      {path: 'platforms', component: PlatformsComponent},
      {path: 'brands', component: BrandsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
