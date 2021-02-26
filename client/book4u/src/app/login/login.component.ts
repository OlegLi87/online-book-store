import { END_LOADING_STREAM } from './../services/dependency-providers/endLoadingStream.provider';
import { AuthorizationError } from './../models/errors.model';
import { Subject } from 'rxjs';
import { AuthService, User } from './../services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ERROR_STREAM } from '../services/dependency-providers/errorStream.provider';

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
  errorMessage: string;
  loading = false;

  constructor(
    private authService: AuthService,
    @Inject(ERROR_STREAM) private errorStream$: Subject<Error>,
    @Inject(END_LOADING_STREAM) private endLoadingStream$: Subject<void>
  ) {}

  ngOnInit(): void {
    this.errorStream$.subscribe((err) => {
      if (err instanceof AuthorizationError) this.errorMessage = err.message;
    });

    this.endLoadingStream$.subscribe(() => (this.loading = false));
  }

  signIn(): void {
    this.loading = true;
    this.authService.login(this.formData, 'signIn');
  }

  signUp(): void {
    this.loading = true;
    this.authService.login(this.formData, 'signUp');
  }

  toggleHoverEffect(event: Event): void {
    const btn = event.target as HTMLButtonElement;
    const hoverClass = 'button-hovered';
    if (event.type === 'mouseover') btn.classList.add(hoverClass);
    else btn.classList.remove(hoverClass);
  }
}
