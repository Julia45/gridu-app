import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuardService implements CanActivate {
  isUserPresent: boolean = false

  constructor(public router: Router, private store: Store<any>) {}
  canActivate(): boolean {

    this.store.select("user").subscribe((data) => {
      if (data.user) {
       this.isUserPresent = true
      }
    });

    if (!this.isUserPresent) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
