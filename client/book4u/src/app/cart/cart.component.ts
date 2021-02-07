import { Subscription } from 'rxjs';
import { Book } from './../services/books.service';
import { CartItem, CartService } from './../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Array<{ book: Book; quantity: number }>;
  private subscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cartItemsUpdated.subscribe(
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
    alert('Thanks for purchasing!!!');
    this.clearItems(false);
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
