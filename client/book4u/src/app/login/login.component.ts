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

  constructor(
    private authService: AuthService,
    @Inject(ERROR_STREAM) private errorStream$: Subject<any>
  ) {}

  ngOnInit(): void {
    this.errorStream$.subscribe((err) => {
      if (err.type === 'authError') {
        this.errorMessage = 'Credentials are incorrect';
      }
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
