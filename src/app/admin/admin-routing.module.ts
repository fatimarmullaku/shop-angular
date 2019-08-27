import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {UsersComponent} from './users/users.component';
import {ProductsComponent} from './products/products.component';
import {RolesComponent} from './users/roles/roles.component';
import {CustomersComponent} from './customers/customers.component';
import {AdminComponent} from './admin.component';
import {PlatformsComponent} from './platforms/platforms.component';
import {BrandsComponent} from './brands/brands.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
