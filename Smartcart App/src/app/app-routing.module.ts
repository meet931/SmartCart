import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SingupComponent } from './Components/singup/singup.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProductViewComponent } from './Components/product-view/product-view.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { OrderTrackingComponent } from './Components/order-tracking/order-tracking.component';
import { authGuard } from './Services/guard/auth.guard';
import { MyOrderComponent } from './Components/my-order/my-order.component';
import { vaildGuard } from './Services/guard/vaild.guard';

// when user is logged in then it must not be able to see login page
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [vaildGuard],
  },
  {
    path: 'signup',
    component: SingupComponent,
    canActivate: [vaildGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  {
    path: 'my-order',
    component: MyOrderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'product-detail/:id',
    component: ProductViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [authGuard],
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'order-track/:id',
    component: OrderTrackingComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
