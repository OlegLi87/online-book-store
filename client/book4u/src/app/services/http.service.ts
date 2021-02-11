import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Book, BooksService } from './books.service';

const connectionString = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private booksService: BooksService, private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http.get<Array<any>>(connectionString + '/books').pipe(
      map((books) => {
        return books.map(this.modifyIdProperty);
      })
    );
  }

  private modifyIdProperty(book: any): Book {
    const modifiedBook = Object.assign({}, book);
    modifiedBook.id = modifiedBook._id;
    delete modifiedBook._id;
    return modifiedBook as Book;
  }
}
