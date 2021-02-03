import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.sass'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor() {}

  ngOnInit(): void {}
}
