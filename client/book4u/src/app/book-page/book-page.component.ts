import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../services/books.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.sass'],
})
export class BookPageComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.book = data.book;
    });
  }

  addToCart(): void {
    this.cartService.addItem(this.book);
  }

  isAdded(): boolean {
    return this.cartService.getItemIndex(this.book) !== -1;
  }
}
