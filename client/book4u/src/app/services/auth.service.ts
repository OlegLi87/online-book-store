import { LocalStorageKeys, LocalStorageService } from './localStorage.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from '../login/login.component';
import jwt_decode from 'jwt-decode';

export class User {
  private token;
  constructor(public userName: string, public isAdmin: boolean) {}

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User>(null);

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) {}

  initCurrentUser(): void {
    const token = localStorage.getItem(LocalStorageKeys.TOKEN_KEY);
    if (token && this.isValidToken(token)) {
      this.createAndStreamUserFromToken(token);
    }
  }

  login(formData: FormData, loginPath: string): void {
    this.httpService.login(formData, loginPath).subscribe((res) => {
      this.createAndStreamUserFromToken(res.token);
      this.saveToken(res.token);
    });
  }

  logout(): void {
    const token = this.currentUser.value.getToken();
    this.httpService.logout(token).subscribe(() => {
      this.localStorageService.remove(LocalStorageKeys.TOKEN_KEY);
      this.currentUser.next(null);
    });
  }

  private createAndStreamUserFromToken(token: string): void {
    const payload = jwt_decode(token) as any;
    const user = new User(payload.userName, payload.isAdmin);
    user.setToken(token);
    this.currentUser.next(user);
  }

  private isValidToken(token): boolean {
    const payload = jwt_decode(token) as any;
    const isValid = payload.exp * 1000 - Date.now() > 0;
    if (!this.isValidToken)
      this.localStorageService.remove(LocalStorageKeys.TOKEN_KEY);
    return isValid;
  }

  private saveToken(token): void {
    this.localStorageService.save(LocalStorageKeys.TOKEN_KEY, token);
  }
}
