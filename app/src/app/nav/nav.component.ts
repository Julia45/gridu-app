import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from "../auth.service"
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogin: boolean = false;
  user$: Observable<number>
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    private auth: AuthenticationService,
    private store: Store<any>
    ) {      this.user$ = store.select('user');
  }

  ngOnInit(): void {
     this.isLogin = true;

     this.store.select("user").subscribe((data) => {
      if (data.user) {
        this.isLogin = true
      }
    });

    this.auth.userChnaged.subscribe((user: any) => {
      if (user) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
     })
  }
}
