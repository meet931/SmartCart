import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SingupComponent } from './Components/singup/singup.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductViewComponent } from './Components/product-view/product-view.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { OrderTrackingComponent } from './Components/order-tracking/order-tracking.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorInterceptor } from './Services/interceptor/interceptor.interceptor';
import { MyOrderComponent } from './Components/my-order/my-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SingupComponent,
    NotFoundPageComponent,
    ProfileComponent,
    WishlistComponent,
    CartComponent,
    ProductViewComponent,
    FooterComponent,
    CheckOutComponent,
    OrderTrackingComponent,
    MyOrderComponent,
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  // interceptor and any other schem are in providers
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
