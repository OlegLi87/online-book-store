import { BooksService } from './services/books.service';
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

// load cart data on app initialization
function initializeApp(cartService: CartService): any {
  return () => {
    cartService.loadItems();
  };
}

// load books on app initialization
function fetchBooks(httpService: HttpService, booksService: BooksService): any {
  return (): Promise<void> => {
    return new Promise<void>((res) => {
      const subs = httpService.fetchBooks().subscribe((books) => {
        booksService.setBooks(books);
        subs.unsubscribe();
        res();
      });
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
    {
      provide: APP_INITIALIZER,
      useFactory: fetchBooks,
      deps: [HttpService, BooksService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
