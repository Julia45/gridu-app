import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from "@angular/platform-browser";

import { GamesComponent } from './games.component';
import { GamesService } from '../games.service';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let service: GamesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesComponent ],
      imports: [MatCardModule, FormsModule, BrowserModule, MatIconModule],
      providers: [HttpHandler, HttpClient]
    })
    .compileComponents();
  });

  const renderComponent = () => {
    fixture = TestBed.createComponent(GamesComponent);
    service = fixture.debugElement.injector.get(GamesService);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.games = [
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
      }
    ]
  }

  it('should create', () => {
    renderComponent()
    expect(component).toBeTruthy();
  });

  it('render games and serach', () => {
    jest.spyOn(localStorage.__proto__, "getItem").mockReturnValue(
      '{"email":"admin@gmail.com","password":"1234","role":"admin"}'
    )
    renderComponent()
    fixture.detectChanges()
    component.searchText = "zoo";
    fixture.detectChanges()
  });
});
