import { BehaviorSubject } from 'rxjs';
import { AuthService, User } from './../../services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { USER_STREAM } from 'src/app/services/dependency-providers/userStream.provider';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Book4u';
  currentUser: User;

  constructor(
    private authService: AuthService,
    @Inject(USER_STREAM) private userStream$: BehaviorSubject<User>
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
    if (confirm('Are you sure you want to logout?')) this.authService.logout();
  }
}
