import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './auth.service';

class MockRouter {
  navigate(path) { }
}

class MockActivatedRouteSnapshot {
  private _data: any;
  get data() {
      return this._data;
  }
}

class MockRouterStateSnapshot {
  url: string = '/';
}

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let auth: AuthenticationService;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService,
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRouteSnapshot, useClass: MockActivatedRouteSnapshot },
        // { provide: AuthenticationService, useClass: MockAuthService },
        { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
      
      
      ],
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(AuthGuardService);
    auth = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for canActivate', () => {
    expect(service.canActivate()).toBeFalsy()
  });

  it('should return true for canActivate', () => {
    var mock = (function() {
      var store = {};
      return {
        getItem: function(key) {
          return store[key];
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        clear: function() {
          store = {};
        }
      };
    })();
    
    Object.defineProperty(window, 'localStorage', { 
      value: mock,
    });

    mock.setItem("currentUser", JSON.stringify({
      "email":"admin@gmail.com","password":"1234","role":"admin"
    }))
    window.localStorage.getItem("currentUser");

    expect(service.canActivate()).toBeTruthy()
  });
});
