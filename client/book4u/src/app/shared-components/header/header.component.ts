import { END_LOADING_STREAM } from './../../services/dependency-providers/endLoadingStream.provider';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService, User } from './../../services/auth.service';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
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
  loading = false;
  @HostListener('document:click', ['$event'])
  onClick() {
    this.showMobileNavList = true;
    this.toggleMobileNavList(null);
  }
  @ViewChild('mobileNavList') mobileNavList: ElementRef<HTMLDivElement>;
  private showMobileNavList = false;

  constructor(
    private authService: AuthService,
    @Inject(USER_STREAM) readonly userStream$: BehaviorSubject<User>,
    @Inject(MODAL_ANSWER_STREAM) private modalAnswerStream$: Subject<boolean>,
    @Inject(END_LOADING_STREAM) private endLoadingStream$: Subject<void>
  ) {}

  ngOnInit(): void {
    this.userStream$.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
    this.endLoadingStream$.subscribe(() => (this.loading = false));
  }

  isAdmin(): boolean {
    return this.userStream$.value?.isAdmin;
  }

  logout(): void {
    this.showModal = true;
    const subscription = this.modalAnswerStream$.subscribe((answer) => {
      subscription.unsubscribe();
      if (answer) {
        this.authService.logout();
        this.loading = true;
      }
      this.showModal = false;
    });
  }

  toggleMobileNavList(event: Event): void {
    event?.stopImmediatePropagation();
    this.showMobileNavList = !this.showMobileNavList;
    if (this.showMobileNavList)
      this.mobileNavList.nativeElement.style['font-size'] = '1rem';
    else this.mobileNavList.nativeElement.style['font-size'] = 0;
  }
}
