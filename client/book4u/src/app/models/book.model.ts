export interface Book {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  category: string[];
  price: number;
  rating: number;
  publishDate: Date;
  arrivalDate: Date;
}
