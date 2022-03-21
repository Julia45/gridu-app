import { LayoutModule } from '@angular/cdk/layout';
import {
  waitForAsync,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../auth.service';
import { NavComponent } from './nav.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { changeTheme } from '../store/user.actions';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let service: AuthenticationService;
  let store: Store;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavComponent],
        imports: [
          NoopAnimationsModule,
          LayoutModule,
          MatButtonModule,
          MatIconModule,
          MatListModule,
          MatSlideToggleModule,
          MatSidenavModule,
          MatToolbarModule,
          RouterTestingModule,
          StoreModule.forRoot({}),
        ],
        providers: [AuthenticationService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    service = fixture.debugElement.injector.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm user login it he/she is loggedIn', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        last_name: 'first',
        first_name: 'first anme',
        email: 'first@gmail.com',
        updated: new Date(),
      })
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isLogin).toBeTruthy();
  });

  it('should check subject subscription', () => {
    component.ngOnInit();
    service.userChnaged.next({
      email: '',
      role: '',
      password: '',
    });
    fixture.detectChanges();
    expect(component.isLogin).toBe(true);
    service.userChnaged.next(null);
    expect(component.isLogin).toBe(false);
  });

  it('should check toggle theme', () => {
    let storeMock = {
      dispatch: jest.spyOn(store, 'dispatch'),
    };

    component.ngOnInit();
    service.userChnaged.next({
      email: '',
      role: '',
      password: '',
    });
    fixture.detectChanges();
    const toggle = fixture.debugElement.query(By.css('.toggle')).nativeElement;
    toggle.dispatchEvent(new Event('click'));
    component.toggleChanges();
    expect(component.darkTheme).toBe(true);
    expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      changeTheme({ name: 'white' })
    );
  });
});
