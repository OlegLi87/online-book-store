import { CartItem } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const CART_STREAM = new InjectionToken('Stream of cart items');

export function CartStreamFactory(): BehaviorSubject<Array<CartItem>> {
  return new BehaviorSubject<Array<CartItem>>(null);
}

export const cartStreamProvider = {
  provide: CART_STREAM,
  useFactory: CartStreamFactory,
};
