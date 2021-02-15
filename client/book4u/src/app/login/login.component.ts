import { AuthService, User } from './../services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USER_STREAM } from '../services/dependency-providers/userStream.provider';

export interface FormData {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  formData: FormData = {
    userName: '',
    password: '',
  };
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

  signIn(): void {
    this.authService.login(this.formData, 'signIn');
  }

  signUp(): void {
    this.authService.login(this.formData, 'signUp');
  }

  toggleHoverEffect(event: Event): void {
    const btn = event.target as HTMLButtonElement;
    const hoverClass = 'button-hovered';
    if (event.type === 'mouseover') btn.classList.add(hoverClass);
    else btn.classList.remove(hoverClass);
  }
}
