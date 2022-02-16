import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { login, logout } from './store/user.actions';
import { HttpClient } from '@angular/common/http';

export class User {
  email: string;
  role: string;
  password: string;
  token?: string;
}

const customers = [
  {
    "email": "admin@gmail.com",
    "password": "1234",
    "role": "admin"
  },
  {
    "email": "guest@gmail.com",
    "password": "5678",
    "role": "guest"
  }
]

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  userChnaged = new Subject<User>();
  user$: Observable<number>

  constructor( private store: Store<any>, private http: HttpClient) {
    this.user$ = store.select('user');
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      let foundCustomer = customers.find((user) => user.email === email && user.password === password)
      if (foundCustomer) {
        this.userChnaged.next(foundCustomer);
        observer.next(foundCustomer);
        this.store.dispatch(login(foundCustomer));
      } else {
        observer.error('Failed to login');
      }
    })
  }

  logout() {
    this.store.dispatch(logout());
    this.userChnaged.next(null);
  }
}
