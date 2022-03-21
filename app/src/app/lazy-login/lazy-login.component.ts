import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

interface User {
  email: string;
  role: string;
  password: string;
  token?: string;
}

@Component({
  selector: 'app-lazy-login',
  templateUrl: './lazy-login.component.html',
  styleUrls: ['./lazy-login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  isLoggedIn: boolean = true;
  user$: Observable<User>;
  unsubscribe = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    public snackBar: MatSnackBar,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = Boolean(JSON.parse(localStorage.getItem('user')));

    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getUserEmailErrorMessage() {
    if (this.myForm.controls.email.errors?.required) {
      return 'This field is required';
    } else if (this.myForm.controls.email.errors?.email) {
      return 'Please enter email';
    }
    return '';
  }

  onLogin() {
    if (this.myForm.status === 'VALID') {
      this.auth
        .login(this.myForm.value.email, this.myForm.value.password)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'You have successfully logged in.',
              duration: 3000,
            });

            setTimeout(() => {
              this.router.navigate([`users/`]);
            }, 1000);
          },
          () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'Sorry, such user dos not exist.',
              duration: 3000,
            });
          }
        );
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
