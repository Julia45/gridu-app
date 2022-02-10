import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService, User } from '../auth.service'
import { NavComponent } from './nav.component';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let service: AuthenticationService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
      ], providers: [AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AuthenticationService);
    fixture.detectChanges();

  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm user login it he/she is loggedIn', () => {
    localStorage.setItem('currentUser', JSON.stringify(
      { last_name: "first",first_name: "first anme",email: "first@gmail.com", updated: new Date()}
    ));
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.isLogin).toBeTruthy();
  });


  it('should check subject subscription', () => {
    component.ngOnInit();
    service.userChnaged.next({
      email: "",
      role: "",
      password: ""
    })
    fixture.detectChanges();
    expect(component.isLogin).toBe(true)
    service.userChnaged.next(null)
    expect(component.isLogin).toBe(false)
  });
});
