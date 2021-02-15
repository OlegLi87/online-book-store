import { BehaviorSubject, Subscription } from 'rxjs';
import { CartItem, CartService } from './../services/cart.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../services/auth.service';
import { USER_STREAM } from '../services/dependency-providers/userStream.provider';
import { Book } from '../models/book.model';
import { CART_STREAM } from '../services/dependency-providers/cartStream.provider';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Array<{ book: Book; quantity: number }>;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService,
    @Inject(USER_STREAM) private userStream$: BehaviorSubject<User>,
    @Inject(CART_STREAM) private cartStream$: BehaviorSubject<Array<CartItem>>
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartStream$.subscribe(
      this.setCartItems.bind(this)
    );
  }

  addItem(book: Book): void {
    this.cartService.addItem(book);
  }

  subtractItem(book: Book): void {
    this.cartService.subtractItem(book);
  }

  removeItem(book: Book): void {
    this.cartService.removeItem(book);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems.forEach((i) => {
      totalPrice += i.quantity * i.book.price;
    });
    return totalPrice;
  }

  pay(): void {
    if (!this.userStream$.value) this.router.navigate(['/login']);
    else {
      alert('Thanks for purchasing!!!');
      this.clearItems(false);
    }
  }

  clearItems(askToClear = true): void {
    let response = true;
    if (askToClear)
      response = confirm('Are you sure you want to clear a whole cart?');
    if (response) this.cartService.clearItems();
  }

  private setCartItems(cartItems: Array<CartItem>): void {
    this.cartItems = [];
    cartItems.forEach((ci) => {
      this.cartItems.push({
        book: ci.item as Book,
        quantity: ci.quantity,
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
