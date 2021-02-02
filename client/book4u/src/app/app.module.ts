import { MainPageModule } from './main-page/mainPage.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CartComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MainPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
