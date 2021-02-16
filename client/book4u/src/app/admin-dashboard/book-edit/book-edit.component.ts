import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass'],
})
export class BookEditComponent implements OnInit {
  @Input() book: Book;

  constructor() {}

  ngOnInit(): void {}

  getRatings(): number[] {
    return [...Array(5).keys()];
  }
}
