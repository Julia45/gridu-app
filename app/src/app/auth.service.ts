import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

interface User {
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
  user$: Observable<User>;
  private readonly TOKEN_NAME = "auth"
  isLoggedIn$ = new BehaviorSubject<any>(true)

  get token () {
    return localStorage.getItem(this.TOKEN_NAME)
  }

  constructor() { }

  login(email: string, password: string): Observable<string | User> {
    return new Observable((observer) => {
      let foundCustomer = customers.find((user) => user.email === email && user.password === password)
      if (foundCustomer) {
        this.userChnaged.next(foundCustomer);
        localStorage.setItem("user", JSON.stringify(foundCustomer))
        observer.next(foundCustomer);
        localStorage.setItem(this.TOKEN_NAME, foundCustomer.email)
        this.isLoggedIn$.next(this.token)
      } else {
        observer.error('Failed to login');
      }
    })
  }

  logout() {
    this.userChnaged.next(null);
    this.isLoggedIn$.next(null)
  }
}
