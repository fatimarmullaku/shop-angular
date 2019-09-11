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
import {AdditionalInformationComponent} from './auth/additional-information/additional-information.component';
import {AddNewProductComponent} from './newproduct/add-new-product/add-new-product.component';
import {CartPreviewComponent} from './cart/cart-preview/cart-preview.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {ShippingComponent} from './cart/shipping/shipping.component';
import {AccountInfoComponent} from './cart/account-info/account-info.component';
import {VerificationComponent} from './cart/verification/verification.component';
import {PaymentMethodsComponent} from './cart/payment-methods/payment-methods.component';
import {CashMethodComponent} from './cart/cash-method/cash-method.component';
import {CreditcardMethodComponent} from './cart/creditcard-method/creditcard-method.component';
import {PaypalMethodComponent} from './cart/paypal-method/paypal-method.component';
import {SuccessScreenComponent} from './cart/success-screen/success-screen.component';
import {ProductUploadComponent} from './product-upload/product-upload.component';
import {PoliceComponent} from './police/police.component';
import {AccountComponent} from './account/account.component';
import {EditProfileComponent} from './account/edit-profile/edit-profile.component';
import {OrderHistoryComponent} from './account/order-history/order-history.component';
import {ShopAuthGuardService} from '../shared/services/guards/shop-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'full'
  },
  {
    path: 'page',
    component: ProductsComponent,
    pathMatch:'full'
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
    path: 'account',
    component: AccountComponent,
    canActivate: [ShopAuthGuardService],
    children: [
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent
      }
    ]
  },
  {
    path: 'auth/additional-information',
    component: AdditionalInformationComponent
  },
  {
    path: 'add-new-product',
    component: AddNewProductComponent
  },
  {
    path: 'cart',
    component: CartPreviewComponent
  },
  {
    path: 'cart/account-info',
    component: AccountInfoComponent
  },
  {
    path: 'cart/shipping',
    canActivate: [ShopAuthGuardService],
    component: ShippingComponent
  },
  {
    path: 'cart/verification',
    canActivate: [ShopAuthGuardService],
    component: VerificationComponent
  },
  {
    path: 'cart/payment-methods',
    canActivate: [ShopAuthGuardService],
    component: PaymentMethodsComponent
  },
  {
    path: 'cart/paypal-method',
    canActivate: [ShopAuthGuardService],
    component: PaypalMethodComponent
  },
  {
    path: 'cart/creditcard-method',
    canActivate: [ShopAuthGuardService],
    component: CreditcardMethodComponent
  },
  {
    path: 'cart/cash-method',
    canActivate: [ShopAuthGuardService],
    component: CashMethodComponent
  },
  {
    path: 'cart/success-screen',
    canActivate: [ShopAuthGuardService],
    component: SuccessScreenComponent
  },
  {
    path: 'wish-list',
    component: WishlistComponent
  },
  {
    path: 'product-upload',
    component: ProductUploadComponent
  },
  {
    path: 'police',
    component: PoliceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
