import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ERROR_STREAM } from './dependency-providers/errorStream.provider';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(@Inject(ERROR_STREAM) private errorStream$: Subject<any>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.streamError.bind(this)));
  }

  streamError(err): Observable<HttpEvent<any>> {
    const errorMessage: string = err.error?.message;
    if (errorMessage.includes('Authorization'))
      this.errorStream$.next({
        type: 'authError',
        message: err.error.message,
      });
    return throwError(err);
  }
}
