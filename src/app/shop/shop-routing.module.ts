import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProductReviewsComponent} from './products/product-detail/product-reviews/product-reviews.component';
import {ProductGalleryComponent} from './products/product-detail/product-gallery/product-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'full'
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    children: [
      {
        path: '',
        component: ProductGalleryComponent,
        pathMatch: 'full'
      },
      {
        path: 'reviews',
        component: ProductReviewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
