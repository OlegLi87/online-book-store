import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.sass'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(event: Event): void {
    this.cartService.addItem(this.book);
    event.stopImmediatePropagation();
  }

  removeFromCart(event: Event): void {
    this.cartService.removeItem(this.book);
    event.stopImmediatePropagation();
  }

  isAdded(): boolean {
    return this.cartService.getItemIndex(this.book) !== -1;
  }
}
