import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  constructor() {}

  login(email: string, password: string): any {
    return new Observable((observer) => {
      let foundCustomer = customers.find((user) => user.email === email && user.password === password)
      if (foundCustomer) {
        this.userChnaged.next(foundCustomer);
        observer.next(foundCustomer);
        localStorage.setItem('currentUser', JSON.stringify(foundCustomer));
      } else {
        observer.error('Geolocation not available');
      }
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userChnaged.next(null);
  }
}
