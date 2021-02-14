import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BooksService } from './books.service';

const connectionString = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private booksService: BooksService, private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http.get<Array<Book>>(connectionString + '/books');
  }

  login(data: any, loginPath: string): Observable<any> {
    return this.http.post<any>(connectionString + '/users/' + loginPath, data);
  }

  logout(token: string): Observable<void> {
    return this.http.post<void>(connectionString + '/users/signout', null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
  }

  fetchCart(token: string): Observable<any> {
    return this.http.get(connectionString + '/users/cart', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
  }

  saveCart(token: string, cart: Array<any>): Observable<any> {
    return this.http.put(connectionString + '/users/cart', cart, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
  }
}
