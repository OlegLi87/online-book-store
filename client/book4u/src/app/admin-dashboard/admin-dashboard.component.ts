import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { BOOKS_STREAM } from '../services/dependency-providers/booksStream.provider';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass'],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('booksList') booksList: ElementRef<HTMLDivElement>;
  @HostListener('body:click', ['$event'])
  click(event: Event) {
    if (this.toggleOpen) this.toggleListView(event);
  }
  toggleOpen = false;
  selectedBook: Book;

  constructor(
    @Inject(BOOKS_STREAM) readonly booksStream$: BehaviorSubject<Array<Book>>
  ) {}

  ngOnInit(): void {}

  toggleListView(event: Event): void {
    event.stopImmediatePropagation();
    const listElement = this.booksList.nativeElement;
    const lastStateClass = Array.from(listElement.classList).find((s) =>
      s.toLocaleLowerCase().includes('wrap')
    );
    listElement.classList.remove(lastStateClass);
    if (!this.toggleOpen) listElement.classList.add('unWrap');
    else listElement.classList.add('wrap');
    this.toggleOpen = !this.toggleOpen;
  }

  bookSelected(book: Book): void {
    this.selectedBook = book;
  }
}
