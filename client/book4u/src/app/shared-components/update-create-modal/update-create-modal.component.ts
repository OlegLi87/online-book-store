import { HttpService } from './../../services/http.service';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Subject } from 'rxjs';
import { END_LOADING_STREAM } from 'src/app/services/dependency-providers/endLoadingStream.provider';

@Component({
  selector: 'app-update-create-modal',
  templateUrl: './update-create-modal.component.html',
  styleUrls: ['./update-create-modal.component.sass'],
})
export class UpdateCreateModalComponent implements OnInit {
  @Input() private book: Book;
  @Output() modalClosed = new Subject<void>();
  formBook: Book;
  loading = false;

  constructor(
    private httpService: HttpService,
    @Inject(END_LOADING_STREAM) private endLoadingStream$: Subject<void>
  ) {}

  ngOnInit(): void {
    if (!this.book)
      this.formBook = {
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        category: [],
        price: 1.05,
        rating: 3,
        publishDate: null,
        arrivalDate: null,
      } as Book;
    else this.formBook = Object.assign({}, this.book);

    this.endLoadingStream$.subscribe(() => {
      this.modalClosed.next();
    });
  }

  setRating(rating: number): void {
    this.formBook.rating = rating;
  }

  save(form: HTMLFormElement): void {
    // when creating new book
    if (!this.formBook._id) this.httpService.addBook(this.formBook);
    else this.httpService.updateBook(this.formBook, this.formBook);
    this.loading = true;
  }

  clearForm(): void {
    for (let key in this.formBook) {
      if (key === '_id') continue;
      this.formBook[key] = null;
    }
  }
}
