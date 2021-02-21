import { Router } from '@angular/router';
import { HttpService } from './../../../services/http.service';
import { CartService } from './../../../services/cart.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/services/auth.service';
import { USER_STREAM } from 'src/app/services/dependency-providers/userStream.provider';
import { MODAL_ANSWER_STREAM } from 'src/app/services/dependency-providers/modalAnswerStream.provider';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.sass'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  showModal: boolean;
  modalQuestion = 'Sure to delete?';
  showCreateUpdateModal = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private httpService: HttpService,
    @Inject(USER_STREAM) readonly userStream$: BehaviorSubject<User>,
    @Inject(MODAL_ANSWER_STREAM) private modalAnswerStream$: Subject<boolean>
  ) {}

  ngOnInit(): void {}

  imageClicked(): void {
    if (this.userStream$.value?.isAdmin) this.showCreateUpdateModal = true;
    else this.router.navigate(['/books', `${this.book._id}`]);
  }

  addToCart(event: Event): void {
    this.cartService.addItem(this.book);
    event.stopImmediatePropagation();
  }

  removeFromCart(event: Event): void {
    this.cartService.removeItem(this.book);
    event.stopImmediatePropagation();
  }

  isAdded(): boolean {
    return this.cartService.getItemIndex(this.book) !== -1;
  }

  onHover(event: Event): void {
    const animationClass = 'rotation-animation';
    const classList = (event.target as SVGSVGElement).classList;
    classList.remove(animationClass);
    classList.add(animationClass);
  }

  delete(event: Event): void {
    event.stopImmediatePropagation();
    this.showModal = true;
    const subscription = this.modalAnswerStream$.subscribe((answer) => {
      this.showModal = false;
      subscription.unsubscribe();
      if (answer) this.httpService.deleteBook(this.book);
    });
  }
}
