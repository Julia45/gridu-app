import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from '../auth.service';
import { LoginComponent } from '../lazy-login/lazy-login.component';

import { LogoutComponent } from './logout.component';

class MockRouter {
  navigate(path) { }
}

class MockRouterStateSnapshot {
  url: string = '/';
}

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let service: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [
        MatCardModule,
        RouterTestingModule
      ],
      providers: [AuthenticationService, { provide: Router, useClass: MockRouter }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AuthenticationService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    jest.useFakeTimers()
    let spy = jest.spyOn(router, "navigate");
    let auth = jest.spyOn(service, "logout");

    component.ngOnInit()
    jest.runAllTimers()
    fixture.detectChanges()
    expect(auth).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(["/login"])


  });
});
