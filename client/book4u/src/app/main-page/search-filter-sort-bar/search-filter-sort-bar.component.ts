import { Book } from 'src/app/models/book.model';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-search-filter-sort-bar',
  templateUrl: './search-filter-sort-bar.component.html',
  styleUrls: ['./search-filter-sort-bar.component.sass'],
})
export class SearchFilterSortBarComponent implements OnInit {
  @Input() originalBooksList: Book[];
  @Output() booksListChanged = new EventEmitter<Book[]>();
  @HostListener('document:click')
  click() {
    this.clearTitleList();
  }
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;
  titles: string[] = [];
  private clonedBookList: Book[];

  constructor() {}

  ngOnInit(): void {
    this.clonedBookList = Array.from(this.originalBooksList);
    this.booksListChanged.emit(this.originalBooksList);
  }

  textChanged(event: Event): void {
    event.stopImmediatePropagation();
    const title = (event.target as HTMLInputElement).value;
    if (title.length < 2) {
      this.clearTitleList();
      this.streamBooks(this.originalBooksList);
      return;
    } else {
      const books = this.findBooks(title);
      this.titles = books.map((b) => b.title);
      this.streamBooks(books);
    }
  }

  listItemClicked(title: string): void {
    this.inputRef.nativeElement.value = title;
    const books = this.findBooks(title);
    this.streamBooks(books);
  }

  clearTitleList(): void {
    this.titles = [];
  }

  clearInput(): void {
    this.inputRef.nativeElement.value = '';
    this.clearTitleList();
    this.streamBooks(this.originalBooksList);
  }

  private findBooks(title: string): Book[] {
    return this.clonedBookList.filter((b) =>
      b.title.toLowerCase().startsWith(title.toLowerCase())
    );
  }

  private streamBooks(books: Book[]): void {
    this.booksListChanged.emit(books);
  }
}
