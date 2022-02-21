import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuardService implements CanActivate {
  isUserPresent: boolean = false

  constructor(public router: Router, private store: Store<any>) {}
  canActivate(): boolean {
    this.isUserPresent = Boolean(localStorage.getItem("user"))
    if (!this.isUserPresent) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
