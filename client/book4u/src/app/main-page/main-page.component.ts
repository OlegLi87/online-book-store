import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { BOOKS_STREAM } from '../services/dependency-providers/booksStream.provider';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
})
export class MainPageComponent implements OnInit {
  booksToDisplay: Book[];

  constructor(
    @Inject(BOOKS_STREAM) readonly booksStream$: BehaviorSubject<Array<Book>>
  ) {}

  ngOnInit(): void {}

  booksListChanged(books: Book[]): void {
    this.booksToDisplay = books;
  }
}
