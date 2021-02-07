import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitializer {
  init(cartService: CartService): void {
    cartService.loadItems();
  }
}
