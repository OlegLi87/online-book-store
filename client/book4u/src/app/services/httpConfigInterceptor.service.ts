import { AuthorizationError } from './../models/errors.model';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { ERROR_STREAM } from './dependency-providers/errorStream.provider';
import { AuthService, User } from './auth.service';
import { USER_STREAM } from './dependency-providers/userStream.provider';
import { END_LOADING_STREAM } from './dependency-providers/endLoadingStream.provider';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(ERROR_STREAM) private errorStream$: Subject<Error>,
    @Inject(USER_STREAM) private userStream$: BehaviorSubject<User>,
    @Inject(END_LOADING_STREAM) private endLoadingStream$: Subject<void>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.userStream$.value)
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userStream$.value.getToken(),
        }),
      });

    return next.handle(req).pipe(
      delay(500),
      tap(() => this.endLoadingStream$.next()),
      catchError(this.reactToError.bind(this))
    ); // delay operator for network latency imitation
  }

  reactToError(err): Observable<HttpEvent<any>> {
    this.endLoadingStream$.next();
    if (!this.userStream$.value && err.error?.message) {
      let error: Error;
      if (err.error?.message.toLowerCase().includes('auth'))
        error = new AuthorizationError('Provided credentials are wrong');
      else if (err.error?.message.toLowerCase().includes('duplicate'))
        error = new AuthorizationError('userName already exists');
      this.errorStream$.next(error);
    } else if (this.userStream$.value && err.error?.message.includes('auth'))
      this.authService.logoutLocally();
    return EMPTY;
  }
}
