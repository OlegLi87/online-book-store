import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass'],
})
export class BooksListComponent implements OnInit {
  @Input() books: Book[];

  constructor() {}

  ngOnInit(): void {}
}
