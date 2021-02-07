import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Book, BooksService } from './books.service';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private booksService: BooksService) {}

  fetchBooks(): void {
    of<Book[]>(this.getDummyData())
      .pipe(delay(100))
      .subscribe((books) => {
        this.booksService.setBooks(books);
      });
  }

  private getDummyData(): Book[] {
    const books = [];

    const book: Book = {
      id: 'sf4sd65f4sd654fsd4',
      title: 'Rage',
      imageUrl:
        'https://imgv2-2-f.scribdassets.com/img/word_document/475515209/original/216x287/af3cb26241/1612176007?v=1',
      author: 'Bob Woodward',
      description:
        'Bob Woodward’s new book, Rage, is an unprecedented and intimate tour de force of new reporting on the Trump presidency facing a global pandemic, economic disaster and racial unrest.',
      category: ['Politics', 'Documentary'],
      price: 35.55,
      rating: 3,
      publishDate: new Date(2020, 8, 15),
      arrivalDate: new Date(2021, 0, 19),
    };

    for (let i = 0; i < 50; i++) {
      books.push({ ...book, id: 'sfsdfsdfsd' + Math.random() * 100000 });
    }

    return books;
  }
}
