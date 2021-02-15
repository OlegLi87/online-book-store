import { Book } from './../../models/book.model';
import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';
export const BOOKS_STREAM = new InjectionToken('Stream of app books');

export function BooksStreamFactory(): BehaviorSubject<Array<Book>> {
  return new BehaviorSubject<Array<Book>>([]);
}

export const booksStreamProvider = {
  provide: BOOKS_STREAM,
  useFactory: BooksStreamFactory,
};
