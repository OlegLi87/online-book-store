import { Observable } from 'rxjs';
import { Book, BooksService } from './books.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book> {
  constructor(private booksService: BooksService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Book | Observable<Book> {
    const id = route.paramMap.get('id');
    const book = this.booksService.getBookById(id);
    if (!book)
      this.router.navigate(['/notFound'], {
        skipLocationChange: true,
      });
    return book;
  }
}
