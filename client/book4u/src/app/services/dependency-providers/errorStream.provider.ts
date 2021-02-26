import { Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const ERROR_STREAM = new InjectionToken('A stream of app errors');

export function errorStreamFactory(): Subject<Error> {
  return new Subject<Error>();
}

export const errorStreamProvider = {
  provide: ERROR_STREAM,
  useFactory: errorStreamFactory,
};
