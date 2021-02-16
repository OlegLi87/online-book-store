import { HttpService } from './../../services/http.service';
import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass'],
})
export class BookEditComponent implements OnInit {
  @Input() book: Book;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  getRatings(): number[] {
    return [...Array(5).keys()];
  }

  update(
    imageUrlTextArea: HTMLTextAreaElement,
    descTextArea: HTMLTextAreaElement,
    priceTextArea: HTMLTextAreaElement,
    ratingSelect: HTMLSelectElement
  ): void {
    const updateObj = {
      imageUrl: imageUrlTextArea.value,
      description: descTextArea.value,
      price: priceTextArea.value,
      rating: ratingSelect.value,
    };
    this.httpService.updateBook(this.book, updateObj);
  }
}
