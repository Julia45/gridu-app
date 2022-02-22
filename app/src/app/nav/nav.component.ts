import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from "../auth.service"
import { Store } from '@ngrx/store';
import {ThemePalette} from '@angular/material/core';
import { changeTheme } from '../store/user.actions';

interface User {
  email: string;
  role: string;
  password: string;
  token?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  darkTheme = false;
  isLogin: boolean = false;
  unsubscribe = new Subject();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    private auth: AuthenticationService,
    private store: Store<any>
    ) {}

  toggleChanges () {
    this.darkTheme = !this.darkTheme
    this.store.dispatch(changeTheme({ name: this.darkTheme ? "white" : "dark" }));
  }

  ngOnInit(): void {
    this.isLogin = Boolean(JSON.parse(localStorage.getItem("user")))
    this.auth.userChnaged.pipe(takeUntil(this.unsubscribe)).subscribe((user: User) => {
      if (user) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
     })
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
