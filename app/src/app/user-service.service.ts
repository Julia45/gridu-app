import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User  {
  last_name: string;
  email: string;
  first_name: string,
  updated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
constructor(private http: HttpClient) { }

  protected baseURl = "http://localhost:8000"

  getUsers(page: any, limit: any): any {
     return new Observable((observer) => {
      this.http.get<any>(`${this.baseURl}/customers?_page=${page}&_limit=${limit}`, { observe: 'response' }).subscribe((resp) => {
        observer.next({
          total: resp.headers.get("x-total-count"),
          users: resp.body
        })
      })
     })
  }

  deleteUser = (id: number): Observable<User> =>  {
    return this.http.delete<User>(`${this.baseURl}/customers/${id}`);
  }

  updateUser = (id, newUser: User): Observable<User>  => {
    return this.http.put<User>(`${this.baseURl}/customers/${id}`, newUser);
  }

  addUser = (newUser): Observable<User> => {
    return this.http.post<User>(`${this.baseURl}/customers`, newUser);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURl}/customers/${id}`);
  }

  getCustomers (): Observable<any[]>  {
    return this.http.get<any[]>(`${this.baseURl}/users`);
  }
}
