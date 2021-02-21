import { Component, Inject, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/services/auth.service';
import { USER_STREAM } from 'src/app/services/dependency-providers/userStream.provider';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass'],
})
export class BooksListComponent implements OnInit {
  @Input() books: Book[];
  showCreateUpdateModal = false;

  constructor(
    @Inject(USER_STREAM) readonly userStream$: BehaviorSubject<User>
  ) {}

  ngOnInit(): void {}
}
