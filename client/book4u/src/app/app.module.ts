import { errorStreamProvider } from './services/dependency-providers/errorStream.provider';
import { HttpConfigInterceptor } from './services/httpConfigInterceptor.service';
import { modalAnswerStreamProvider } from './services/dependency-providers/modalAnswerStream.provider';
import { CartItem } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import {
  cartStreamProvider,
  CART_STREAM,
} from './services/dependency-providers/cartStream.provider';
import { booksStreamProvider } from './services/dependency-providers/booksStream.provider';
import { userStreamProvider } from './services/dependency-providers/userStream.provider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NavigationEnd, Router } from '@angular/router';

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
function intializeCart(
  cartService: CartService,
  cartStream$: BehaviorSubject<Array<CartItem>>
): any {
  return (): Promise<void> => {
    return new Promise((res) => {
      cartService.initService();
      let subs;
      subs = cartStream$.subscribe((cart) => {
        if (Array.isArray(cart)) {
          subs?.unsubscribe(); // in case cart loading was synchronous -> subs=undefined.
          res();
        }
      });
    });
  };
}

function configureRouter(router: Router): any {
  return () => {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    NotFoundComponent,
    BookPageComponent,
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
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
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
      deps: [CartService, CART_STREAM],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configureRouter,
      deps: [Router],
      multi: true,
    },
    booksStreamProvider,
    userStreamProvider,
    cartStreamProvider,
    modalAnswerStreamProvider,
    errorStreamProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
