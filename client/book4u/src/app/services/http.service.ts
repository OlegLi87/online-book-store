import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { User } from './auth.service';
import { BOOKS_STREAM } from './dependency-providers/booksStream.provider';
import { USER_STREAM } from './dependency-providers/userStream.provider';

const connectionString = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private AUTH_METHOD = 'Bearer ';
  constructor(
    private http: HttpClient,
    @Inject(BOOKS_STREAM) private booksStream$: BehaviorSubject<Array<Book>>,
    @Inject(USER_STREAM) private userStream$: BehaviorSubject<User>
  ) {}

  fetchBooks(): Promise<void> {
    return new Promise((res) => {
      this.http
        .get<Array<Book>>(connectionString + '/books')
        .pipe(
          map((books) =>
            books.map((b) => {
              return {
                ...b,
                publishDate: new Date(b.publishDate),
                arrivalDate: new Date(b.arrivalDate),
              };
            })
          )
        )
        .subscribe((books) => {
          this.booksStream$.next(books);
          res();
        });
    });
  }

  addBook(book: Book): void {
    this.http
      .post<Observable<Book>>(connectionString + '/books', book)
      .subscribe(this.fetchBooks.bind(this));
  }

  updateBook(book: Book, updateData: any): void {
    this.http
      .put<Observable<Book>>(
        connectionString + '/books/' + book._id,
        updateData
      )
      .subscribe(this.fetchBooks.bind(this));
  }

  deleteBook(book: Book): void {
    this.http
      .delete(connectionString + '/books/' + book._id)
      .subscribe(this.fetchBooks.bind(this));
  }

  login(data: any, loginPath: string): Observable<any> {
    return this.http.post<any>(connectionString + '/users/' + loginPath, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(connectionString + '/users/signout', null);
  }

  fetchCart(): Observable<any> {
    return this.http.get(connectionString + '/users/cart');
  }

  saveCart(cart: Array<any>): Observable<any> {
    return this.http.put(connectionString + '/users/cart', cart);
  }
}
