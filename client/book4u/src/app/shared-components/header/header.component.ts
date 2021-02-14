import { AuthService, User } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Book4u';
  currentUser: User;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) this.authService.logout();
  }

  ngOnInit(): void {}
}
