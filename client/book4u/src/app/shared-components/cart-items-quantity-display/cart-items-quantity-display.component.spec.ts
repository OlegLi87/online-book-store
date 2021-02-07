import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsQuantityDisplayComponent } from './cart-items-quantity-display.component';

describe('CartItemsQuantityDisplayComponent', () => {
  let component: CartItemsQuantityDisplayComponent;
  let fixture: ComponentFixture<CartItemsQuantityDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemsQuantityDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsQuantityDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
