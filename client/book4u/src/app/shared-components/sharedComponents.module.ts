import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CartItemsQuantityDisplayComponent } from './cart-items-quantity-display/cart-items-quantity-display.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RatingStarsComponent,
    CartItemsQuantityDisplayComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, RatingStarsComponent],
})
export class SharedComponentsModule {}
