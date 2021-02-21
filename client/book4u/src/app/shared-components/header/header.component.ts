import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService, User } from './../../services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { USER_STREAM } from 'src/app/services/dependency-providers/userStream.provider';
import { MODAL_ANSWER_STREAM } from 'src/app/services/dependency-providers/modalAnswerStream.provider';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Book4u';
  currentUser: User;
  showModal: boolean;
  modalQuestion = 'Sure to logout?';

  constructor(
    private authService: AuthService,
    @Inject(USER_STREAM) readonly userStream$: BehaviorSubject<User>,
    @Inject(MODAL_ANSWER_STREAM) private modalAnswerStream$: Subject<boolean>
  ) {}

  ngOnInit(): void {
    this.userStream$.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  isAdmin(): boolean {
    return this.userStream$.value?.isAdmin;
  }

  logout(): void {
    this.showModal = true;
    const subscription = this.modalAnswerStream$.subscribe((answer) => {
      subscription.unsubscribe();
      if (answer) this.authService.logout();
      this.showModal = false;
    });
  }
}
