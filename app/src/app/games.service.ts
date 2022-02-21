import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  protected baseURl = "http://localhost:8000"

  constructor(private http: HttpClient) { }

   getGames(): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.baseURl}/games`, { observe: 'response' }).subscribe((resp) => {
        observer.next({
          total: resp.headers.get("x-total-count"),
          games: resp.body
        })
      })
     })
   }

   searchGames (searchText): Observable<any> {
     return this.http.get(`${this.baseURl}/games?q=${searchText}`)
    // return new Observable((observer) => {
    //   this.http.get<any>(`${this.baseURl}/games`, { observe: 'response' }).subscribe((resp) => {
    //     observer.next({
    //       total: resp.headers.get("x-total-count"),
    //       games: resp.body
    //     })
    //   })
    //  })
   } 
}
