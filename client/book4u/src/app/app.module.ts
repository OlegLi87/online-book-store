import { CartService } from './services/cart.service';
import { SharedComponentsModule } from './shared-components/sharedComponents.module';
import { MainPageModule } from './main-page/mainPage.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';

// load cart data from localstorage on app initializing
function initializeApp(cartService: CartService): any {
  return () => {
    cartService.loadItems();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    SharedComponentsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [CartService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
