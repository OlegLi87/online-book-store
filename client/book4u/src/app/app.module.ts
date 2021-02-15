import { cartStreamProvider } from './services/dependency-providers/cartStream.provider';
import { booksStreamProvider } from './services/dependency-providers/booksStream.provider';
import { userStreamProvider } from './services/dependency-providers/userStream.provider';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
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
import { BookPageComponent } from './book-page/book-page.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

// load books on app initialization
function fetchBooks(httpService: HttpService): any {
  return (): Promise<void> => {
    return httpService.fetchBooks();
  };
}

function initializeUser(authService: AuthService) {
  return () => {
    authService.initCurrentUser();
  };
}

// load cart data on app initialization
function intializeCart(cartService: CartService): any {
  return () => {
    cartService.initService();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    NotFoundComponent,
    BookPageComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MainPageModule,
    SharedComponentsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: fetchBooks,
      deps: [HttpService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: intializeCart,
      deps: [CartService],
      multi: true,
    },
    booksStreamProvider,
    userStreamProvider,
    cartStreamProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
