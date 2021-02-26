import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { LocalStorageKeys, LocalStorageService } from './localStorage.service';
import { HttpService } from './http.service';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from '../login/login.component';
import jwt_decode from 'jwt-decode';
import { USER_STREAM } from './dependency-providers/userStream.provider';

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
  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private router: Router,
    @Inject(USER_STREAM) private userStream$: BehaviorSubject<User>
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
      this.redirectToMainPage();
    });
  }

  logout(): void {
    this.cartService.saveCart(true).then(() => {
      const token = this.userStream$.value.getToken();
      this.httpService.logout().subscribe(() => {
        this.localStorageService.remove(LocalStorageKeys.TOKEN_KEY);
        this.userStream$.next(null);
      });
    });
  }

  // in case of invalid token and logedin user
  logoutLocally(): void {
    this.localStorageService.remove(LocalStorageKeys.TOKEN_KEY);
    this.userStream$.next(null);
    this.router.navigate(['/login']);
  }

  private createAndStreamUserFromToken(token: string): void {
    const payload = jwt_decode(token) as any;
    const user = new User(payload.userName, payload.isAdmin);
    user.setToken(token);
    this.userStream$.next(user);
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

  private redirectToMainPage(): void {
    this.router.navigate(['/']);
  }
}
