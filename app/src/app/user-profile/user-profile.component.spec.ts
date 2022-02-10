import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserServiceService } from "../user-service.service"
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from "rxjs";

import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let service: UserServiceService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [UserServiceService, HttpClient, HttpHandler,

        {provide: ActivatedRoute, useValue: {
              snapshot: {
                params: {
                  "id": "1"
                }
              }
        } }
      ],
      imports: [MatCardModule, BrowserAnimationsModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(UserServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a correct user', () => {
    fixture.detectChanges()
    const getUser = jest.spyOn(service, "getUser").mockReturnValue(of(
      { last_name: "first",first_name: "first name",email: "first@gmail.com", updated: new Date()},
    ))
    component.ngOnInit()
    expect(getUser).toHaveBeenCalledWith(1);
    expect(component.user.last_name).toBe("first")
    expect(component.user.first_name).toBe("first name")
    expect(component.user.email).toBe("first@gmail.com")



  });
});
