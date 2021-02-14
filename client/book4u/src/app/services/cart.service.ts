import { map, tap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';
import { LocalStorageKeys, LocalStorageService } from './localStorage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

type Item = {
  _id: string;
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
  private onServiceInitialize = true;
  private currentUser: User;
  private cart: Array<CartItem> = [];
  cartUpdated = new BehaviorSubject<Array<CartItem>>(this.cart);

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    // before closing app save cart data into local storage
    window.onbeforeunload = () => {
      this.saveCart();
    };
  }

  initService(): void {
    this.authService.currentUser.subscribe((currentUser) => {
      // if (!this.onServiceInitialize) this.saveCart(); // saving cart before user login/logout.
      this.currentUser = currentUser;
      this.loadCart();
    });
    this.onServiceInitialize = false;
  }

  addItem(item: Item): void {
    const itemIndex = this.getItemIndex(item);
    if (itemIndex !== -1) this.cart[itemIndex].quantity++;
    else this.cart.push({ item, quantity: 1 });
    this.streamCart();
  }

  subtractItem(item: Item): void {
    const itemIndex = this.getItemIndex(item);
    if (itemIndex !== -1) {
      if (this.cart[itemIndex].quantity > 1) this.cart[itemIndex].quantity--;
      this.streamCart();
    }
  }

  removeItem(item: Item): void {
    const itemIndex = this.getItemIndex(item);
    if (itemIndex !== -1) this.cart.splice(itemIndex, 1);
    this.streamCart();
  }

  clearItems(): void {
    this.cart = [];
    this.streamCart();
  }

  loadCart(): void {
    if (!this.currentUser) {
      this.cart =
        this.localStorageService.load(LocalStorageKeys.CART_KEY) ?? [];
      this.streamCart();
    } else {
      this.httpService
        .fetchCart(this.currentUser.getToken())
        .pipe(
          tap(console.log),
          map((cart) =>
            cart.map((book) => {
              return { item: book.book, quantity: book.quantity };
            })
          )
        )
        .subscribe((cartItems) => {
          this.cart = cartItems;
          this.streamCart();
        });
    }
  }

  private saveCart(): void {
    if (!this.currentUser)
      this.localStorageService.save(LocalStorageKeys.CART_KEY, this.cart);
    else {
      const userCart = this.modifyUserCart();
      this.httpService
        .saveCart(this.currentUser.getToken(), userCart)
        .subscribe(console.log);
    }
  }

  getItemIndex(item: Item): number {
    return this.cart.findIndex((i) => i.item._id === item._id);
  }

  private streamCart(): void {
    this.cartUpdated.next(this.cart);
  }

  private modifyUserCart(): Array<any> {
    return this.cart.map((item) => {
      return { bookId: item.item._id, quantity: item.quantity };
    });
  }
}
