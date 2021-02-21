import { HttpService } from './../../services/http.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-create-modal',
  templateUrl: './update-create-modal.component.html',
  styleUrls: ['./update-create-modal.component.sass'],
})
export class UpdateCreateModalComponent implements OnInit {
  @Input() book: Book;
  @Output() modalClosed = new Subject<void>();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    console.log(this.book);
    if (!this.book)
      this.book = {
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        category: [],
        price: 1.05,
        rating: 3,
      } as Book;
  }

  setRating(rating: number): void {
    this.book.rating = rating;
  }

  save(form: HTMLFormElement): void {
    // when creating new book
    if (!this.book._id) this.httpService.addBook(this.book);
    else this.httpService.updateBook(this.book, this.book);
    this.modalClosed.next();
  }
}
