import { Observable } from 'rxjs';
import { Book, BooksService } from './books.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book> {
  constructor(
    private booksService: BooksService,
    private router: Router,
    private location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Book {
    const path = this.location.path();
    const id = route.paramMap.get('id');
    const book = this.booksService.getBookById(id);
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
