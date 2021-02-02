import { HttpService } from './../services/http.service';
import { Book, BooksService } from './../services/books.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  books: Book[];
  private subscription: Subscription;

  constructor(
    private booksService: BooksService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    if (!(this.books = this.booksService.getBooks())) {
      this.subscription = this.booksService.booksUpdated.subscribe((books) => {
        this.books = books;
        console.log(this.books);
      });
      this.httpService.fetchBooks();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
