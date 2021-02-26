import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CartItemsQuantityDisplayComponent } from './cart-items-quantity-display/cart-items-quantity-display.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { UpdateCreateModalComponent } from './update-create-modal/update-create-modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RatingStarsComponent,
    CartItemsQuantityDisplayComponent,
    ConfirmModalComponent,
    UpdateCreateModalComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    RatingStarsComponent,
    ConfirmModalComponent,
    UpdateCreateModalComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedComponentsModule {}
