import { map, pairwise, startWith } from 'rxjs/operators';
import { LocalStorageKeys, LocalStorageService } from './localStorage.service';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { USER_STREAM } from './dependency-providers/userStream.provider';
import { User } from './auth.service';
import { CART_STREAM } from './dependency-providers/cartStream.provider';

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
  private cart: Array<CartItem> = [];

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    @Inject(USER_STREAM) private userStream$: BehaviorSubject<User>,
    @Inject(CART_STREAM) private cartStream$: BehaviorSubject<Array<CartItem>>
  ) {}

  initService(): void {
    this.userStream$
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, latest]) => {
        if (!prev && latest) this.saveCart(false); // In case user logged in saving cart to local storage.
        this.loadCart();
      });

    // before closing app save the cart.
    window.onbeforeunload = () => {
      this.saveCart(!!this.userStream$.value); // converting to boolean type.
    };
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
    if (!this.userStream$.value) {
      this.cart =
        this.localStorageService.load(LocalStorageKeys.CART_KEY) ?? [];
      this.streamCart();
    } else {
      this.httpService
        .fetchCart(this.userStream$.value.getToken())
        .pipe(
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

  saveCart(remoteSave: boolean): Promise<void> {
    return new Promise((res) => {
      if (!remoteSave) {
        this.localStorageService.save(LocalStorageKeys.CART_KEY, this.cart);
        res();
      } else {
        const userCart = this.modifyUserCart();
        this.httpService
          .saveCart(this.userStream$.value.getToken(), userCart)
          .subscribe(() => {
            res();
          });
      }
    });
  }

  getItemIndex(item: Item): number {
    return this.cart.findIndex((i) => i.item._id === item._id);
  }

  private streamCart(): void {
    this.cartStream$.next(this.cart);
  }

  private modifyUserCart(): Array<any> {
    return this.cart.map((item) => {
      return { bookId: item.item._id, quantity: item.quantity };
    });
  }
}
