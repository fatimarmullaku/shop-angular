import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardBaseComponent} from './admin/layout/base/dashboard-base.component';
import {BaseComponent} from './shared/layout/base/base.component';

const routes: Routes = [

  {
    path: '',
    component: BaseComponent,
    loadChildren: './shop/shop.module#ShopModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
