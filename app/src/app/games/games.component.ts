import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, last, takeUntil } from 'rxjs/operators';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games = [];
  user$: Observable<any>;
  showSearch = false
  searchText = ""
  unsubscribe = new Subject();


  constructor(private gamesSvc: GamesService) { 
  }

  onChange (searchText) {
    this.gamesSvc.searchGames(searchText)
    .pipe(delay(1000), last(), takeUntil(this.unsubscribe))
    .subscribe((data) => {
      this.games = data
    })
  }

  ngOnInit(): void {
    this.showSearch = JSON.parse(localStorage.getItem("user")).role === "admin"
     this.gamesSvc.getGames().subscribe((data) => {
       this.games = data.games
     })
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
