import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Item = {
  id: string;
};

export interface CartItem {
  item: Item;
  quantity: number;
}

// Cart service loading cart items data once at app initializing,during application lifetime
// all data manipulation done on internal state of the service.On app close data will be saved
// back into localstorage.

@Injectable({ providedIn: 'root' })
export class CartService {
  private LOCAL_STORAGE_KEY = 'cartItems';
  private cartItems: Array<CartItem>;

  cartItemsUpdated = new BehaviorSubject<Array<CartItem>>(null);

  constructor() {
    // before closing app save cart data into local storage
    window.onbeforeunload = () => {
      this.save();
    };
  }

  addItem(item: Item): void {
    const itemIndex = this.getItemIndex(item);
    if (itemIndex !== -1) this.cartItems[itemIndex].quantity++;
    else this.cartItems.push({ item, quantity: 1 });
    this.streamItems();
  }

  subtractItem(item: Item): void {
    const itemIndex = this.getItemIndex(item);
    if (itemIndex !== -1) {
      if (this.cartItems[itemIndex].quantity > 1)
        this.cartItems[itemIndex].quantity--;
    }
    this.streamItems();
  }

  removeItem(item: Item): void {
    const itemIndex = this.getItemIndex(item);
    if (itemIndex !== -1) this.cartItems.splice(itemIndex, 1);
    this.streamItems();
  }

  clearItems(): void {
    this.cartItems = [];
    this.streamItems();
  }

  loadItems(): void {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) ?? [];
    this.streamItems();
  }

  private streamItems(): void {
    this.cartItemsUpdated.next(this.cartItems);
  }

  private save(): void {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.cartItems)
    );
  }

  private getItemIndex(item: Item): number {
    return this.cartItems.findIndex((i) => i.item.id === item.id);
  }
}
