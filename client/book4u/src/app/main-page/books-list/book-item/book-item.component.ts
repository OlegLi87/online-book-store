import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.sass'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(): void {
    this.cartService.addItem(this.book);
  }
}
