import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseComponent} from './shared/layout/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    loadChildren: './shop/shop.module#ShopModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
