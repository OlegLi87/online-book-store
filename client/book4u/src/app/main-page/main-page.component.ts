import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../models/book.model';
import { BOOKS_STREAM } from '../services/dependency-providers/booksStream.provider';
import { MODAL_ANSWER_STREAM } from '../services/dependency-providers/modalAnswerStream.provider';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
})
export class MainPageComponent implements OnInit {
  constructor(
    @Inject(BOOKS_STREAM) readonly booksStream$: BehaviorSubject<Array<Book>>
  ) {}

  ngOnInit(): void {}
}
