import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from "rxjs";

import { GamesService } from './games.service';

const getGamesHTTP = { get: jest.fn(() => of([
  {
    total: 2,
    games: [
      {
        "name": "Idle Zoo",
        "description": "Idle Zoo is a free idle game. You did it. You bought a zoo. You were saying for years that you were going to buy a zoo and to be honest, nobody really believed you would but then you showed us all, you did it, you actually did it, you bought a zoo.",
        "participators": 6,
        "image": "/assets/idle_zoo.jpeg"
      },
      {
        "name": "Super Candy Jewels",
        "description": "Super Candy Jewels is a free puzzle game. All of the candy in the world can be yours if you have the tenacity and the temerity to tap, drag, slide and match your way to victory. Super Candy Jewels is a game that will allow you to taste the sweet taste of success.",
        "participators": 6,
        "image": "/assets/candy_jewels.jpeg"
      },
    ]
  }
])) };
const searchGamesHttp = { get: jest.fn(() => of([
  {
    "name": "Super Candy Jewels",
    "description": "Super Candy Jewels is a free puzzle game. All of the candy in the world can be yours if you have the tenacity and the temerity to tap, drag, slide and match your way to victory. Super Candy Jewels is a game that will allow you to taste the sweet taste of success.",
    "participators": 6,
    "image": "/assets/candy_jewels.jpeg"
  },
])) };

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandler, HttpClient]
  });
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getGames', () => {
    service.getGames().subscribe(games => {
        expect(getGamesHTTP.get).toHaveBeenCalled();
        expect(games.length).toBe(2);
      });
  });

  it('should call searchGames', () => {
    service.searchGames("Super").subscribe((games) => {
      expect(searchGamesHttp.get).toHaveBeenCalledWith();
      expect(games.length).toBe(1);
    })
  })
});
