import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {UsersComponent} from './users/users.component';
import {ProductsComponent} from './products/products.component';
import {RolesComponent} from './users/roles/roles.component';
import {CustomersComponent} from './customers/customers.component';
import {DashboardBaseComponent} from './layout/base/dashboard-base.component';
import {PlatformsComponent} from './products/platforms/platforms.component';
import {PublishersComponent} from './products/publishers/publishers.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardBaseComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'orders', component: OrdersComponent},
      {
        path: 'products',
        component: ProductsComponent
      },
      {path: 'products/platforms', component: PlatformsComponent},
      {path: 'products/publishers', component: PublishersComponent},
      {path: 'users', component: UsersComponent},
      {path: 'roles', component: RolesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
