import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinComponent} from './shared/layout/min/min.component';

const routes: Routes = [

  {
    path: '',
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
