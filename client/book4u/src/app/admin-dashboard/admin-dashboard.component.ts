import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { BOOKS_STREAM } from '../services/dependency-providers/booksStream.provider';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    @Inject(BOOKS_STREAM) readonly booksStream$: BehaviorSubject<Array<Book>>
  ) {}

  ngOnInit(): void {}

  getKeys(): string[] {
    return Object.keys(this.booksStream$.value[0]);
  }
}
