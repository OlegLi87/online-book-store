import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from '../models/book.model';
import { BehaviorSubject } from 'rxjs';
import { BOOKS_STREAM } from './dependency-providers/booksStream.provider';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book> {
  constructor(
    private router: Router,
    private location: Location,
    @Inject(BOOKS_STREAM) private booksStream$: BehaviorSubject<Array<Book>>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Book {
    const path = this.location.path();
    const id = route.paramMap.get('id');
    const book = this.booksStream$.value.find((b) => b._id === id);
    if (!book)
      this.router
        .navigate(['/notFound'], {
          skipLocationChange: true,
        })
        .then(() => {
          this.location.replaceState(path); // Keeping previous url in adress bar when navigating to not found page.
        });
    return book;
  }
}
