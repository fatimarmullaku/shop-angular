import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrandsComponent} from "./brands/brands.component";
import {CategoriesComponent} from "./categories/categories.component";
import {HomeComponent} from "./home/home.component";
import {OrdersComponent} from "./orders/orders.component";
import {UsersComponent} from "./users/users.component";
import {ProductsComponent} from "./products/products.component";
import {RolesComponent} from "./roles/roles.component";
import {CustomersComponent} from "./customers/customers.component";


const routes: Routes = [
  {path: 'categories', component: CategoriesComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'home', component: HomeComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'roles', component: RolesComponent}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
