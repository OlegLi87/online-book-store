import { Observable } from 'rxjs';
import { Book, BooksService } from './books.service';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book> {
  constructor(private booksService: BooksService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Book | Observable<Book> {
    const id = route.paramMap.get('id');
    return this.booksService.getBookById(id) ?? ({} as Book);
  }
}
