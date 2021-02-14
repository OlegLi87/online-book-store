import { AuthService, User } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((currentUser) => {
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
