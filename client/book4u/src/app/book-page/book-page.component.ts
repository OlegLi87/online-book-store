import { CartService } from './../services/cart.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../services/auth.service';
import { USER_STREAM } from '../services/dependency-providers/userStream.provider';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.sass'],
})
export class BookPageComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    @Inject(USER_STREAM) readonly userStream$: BehaviorSubject<User>
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
