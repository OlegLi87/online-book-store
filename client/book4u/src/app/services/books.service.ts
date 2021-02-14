import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Book {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  category: string[];
  price: number;
  rating: number;
  publishDate: Date;
  arrivalDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: Book[];
  booksUpdated = new Subject<Book[]>();

  setBooks(books: Book[]): void {
    this.books = books;
    this.booksUpdated.next(this.books);
  }

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book {
    return this.books.find((b) => b._id === id);
  }
}
