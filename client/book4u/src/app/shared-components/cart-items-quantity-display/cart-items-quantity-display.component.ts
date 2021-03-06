import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
} from '@angular/core';
import { CartItem } from 'src/app/services/cart.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CART_STREAM } from 'src/app/services/dependency-providers/cartStream.provider';

@Component({
  selector: '[quantityDisplay]',
  templateUrl: './cart-items-quantity-display.component.html',
  styleUrls: ['./cart-items-quantity-display.component.sass'],
})
export class CartItemsQuantityDisplayComponent
  implements AfterViewInit, OnDestroy {
  private ON_UPDATE_CLASS = 'updated';
  private subscription: Subscription;
  cartItems: Array<CartItem>;
  @ViewChild('display') display: ElementRef<HTMLDivElement>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    @Inject(CART_STREAM) private cartStream$: BehaviorSubject<Array<CartItem>>
  ) {}

  ngAfterViewInit(): void {
    this.subscription = this.cartStream$.subscribe(
      this.changeDisplayValue.bind(this)
    );
    this.changeDetector.detectChanges();
  }

  private changeDisplayValue(cartItems: Array<CartItem>): void {
    const firstChange = !this.cartItems;
    if (!firstChange && this.cartItems.length === cartItems.length) return;
    if (!firstChange)
      this.createVisualEffect(this.cartItems.length - cartItems.length);
    this.cartItems = [...cartItems];
  }

  private createVisualEffect(val: number): void {
    const upDown = val > 0 ? 'down' : 'up';
    this.display.nativeElement.classList.add(this.ON_UPDATE_CLASS);
    this.display.nativeElement.classList.add(upDown);

    let effectDuration = 150;
    if (upDown === 'down') effectDuration = 350;

    setTimeout(() => {
      this.display.nativeElement.classList.remove(this.ON_UPDATE_CLASS);
      this.display.nativeElement.classList.remove(upDown);
    }, effectDuration);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
