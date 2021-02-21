import { User } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const USER_STREAM = new InjectionToken<BehaviorSubject<User>>(
  'A stream with current user'
);

function userStreamFactory(): BehaviorSubject<User> {
  return new BehaviorSubject<User>(null);
}

export const userStreamProvider = {
  provide: USER_STREAM,
  useFactory: userStreamFactory,
};
