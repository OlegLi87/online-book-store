import { USER_STREAM } from './dependency-providers/userStream.provider';
import { User } from './auth.service';
import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardGuard implements CanActivate {
  constructor(
    @Inject(USER_STREAM) private userStream$: BehaviorSubject<User>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.userStream$.value?.isAdmin;
  }
}
