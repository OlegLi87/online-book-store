import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Book4u';
  userName: string = 'guest';
  logText: string = 'Login';

  constructor() {}

  ngOnInit(): void {}
}
