import { Injectable } from '@angular/core';

export interface Book {
  id: string;
  imageUrl: string;
  name: string;
  author: string;
  price: number;
  rating: number;
  publishDate: Date;
  arrivalDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {}
