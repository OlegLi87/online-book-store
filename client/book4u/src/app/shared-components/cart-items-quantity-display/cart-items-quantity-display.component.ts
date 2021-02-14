import { CartService } from './../../services/cart.service';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CartItem } from 'src/app/services/cart.service';

@Component({
  selector: '[quantityDisplay]',
  templateUrl: './cart-items-quantity-display.component.html',
  styleUrls: ['./cart-items-quantity-display.component.sass'],
})
export class CartItemsQuantityDisplayComponent implements AfterViewInit {
  cartItems: Array<CartItem>;
  private ON_UPDATE_CLASS = 'updated';
  @ViewChild('display') display: ElementRef<HTMLDivElement>;

  constructor(
    private cartService: CartService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cartService.cartUpdated.subscribe(this.changeDisplayValue.bind(this));
    this.changeDetector.detectChanges();
  }

  private changeDisplayValue(cartItems: Array<CartItem>): void {
    const firstChange = !this.cartItems;
    if (!firstChange && this.cartItems.length === cartItems.length) return;
    this.cartItems = [...cartItems];
    if (!firstChange) this.createVisualEffect();
  }

  private createVisualEffect(): void {
    this.display.nativeElement.classList.add(this.ON_UPDATE_CLASS);
    setTimeout(
      () => this.display.nativeElement.classList.remove(this.ON_UPDATE_CLASS),
      150
    );
  }
}
