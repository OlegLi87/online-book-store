import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingStarComponent } from './rating-star/rating-star.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, RatingStarComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, RatingStarComponent],
})
export class SharedComponentsModule {}
