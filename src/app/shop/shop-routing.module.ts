import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProductReviewsComponent} from './products/product-detail/product-reviews/product-reviews.component';
import {ProductGalleryComponent} from './products/product-detail/product-gallery/product-gallery.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {NewPasswordComponent} from './auth/new-password/new-password.component';
import {AuthLayoutComponent} from './auth/auth-layout/auth-layout.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {SignUpSuccessComponent} from './auth/sign-up-success/sign-up-success.component';
import {AdditionalInformationComponent} from './auth/additional-information/additional-information.component';


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
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'sign-up-success',
        component: SignUpSuccessComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'new-password/:token',
        component: NewPasswordComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login'
      }
    ]
  },
  {
    path: 'additional-information',
    component: AdditionalInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
