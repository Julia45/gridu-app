import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  async,
} from '@angular/core/testing';
import { LoginComponent } from './lazy-login.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../auth.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { AuthGuardService } from '../auth-guard.service';
import { Store, StoreModule } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let snackBar: MatSnackBar;
  let service: AuthenticationService;
  let authGuardService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, SnackbarComponent],
      imports: [
        MatCardModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
      ],
      providers: [MatSnackBar, AuthenticationService, AuthGuardService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    snackBar = fixture.debugElement.injector.get(MatSnackBar);
    service = fixture.debugElement.injector.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the form when loggin in', () => {
    component.isLoggedIn = false;
    const compiled = fixture.debugElement.nativeElement;
    let inputs = compiled.getElementsByTagName('input');
    expect(inputs).toHaveLength(2);
    let inputsLabels = compiled.getElementsByTagName('mat-label');
    expect(inputsLabels[0].innerHTML).toBe('Email');
    expect(inputsLabels[1].innerHTML).toBe('Password');
  });

  it('should show the error when the inputs are not valid', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const inputEmailElement = fixture.debugElement.query(
      By.css('.emailInput')
    ).nativeElement;
    inputEmailElement.value = 'unvalid email';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    let emailError = compiled.getElementsByTagName('mat-error')[0];
    expect(emailError.innerHTML).toBe('Please enter email');
    const inputPassElement = fixture.debugElement.query(
      By.css('.passInput')
    ).nativeElement;
    inputPassElement.value = '';
    inputPassElement.dispatchEvent(new Event('input'));
    inputPassElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    let passError = compiled.getElementsByTagName('mat-error')[1];
    expect(passError.innerHTML).toBe('Password is required');
    inputEmailElement.value = '';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    let emailRequiredError = compiled.getElementsByTagName('mat-error')[0];
    expect(emailRequiredError.innerHTML).toBe('This field is required');
  });

  it('no email errors', () => {
    const compiled = fixture.debugElement.nativeElement;
    const inputEmailElement = fixture.debugElement.query(
      By.css('.emailInput')
    ).nativeElement;
    inputEmailElement.value = 'john@gmail.com';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    let emailError = compiled.getElementsByTagName('mat-error')[0];
    console.log(emailError);
    expect(emailError).not.toBeTruthy();
  });

  it('should submit value, but inform that thwe user does not exsist', () => {
    const compiled = fixture.debugElement.nativeElement;
    const inputEmailElement = fixture.debugElement.query(
      By.css('.emailInput')
    ).nativeElement;
    const inputPassElement = fixture.debugElement.query(
      By.css('.passInput')
    ).nativeElement;

    inputEmailElement.value = 'pat@gmail.com';
    inputPassElement.value = '1';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'));
    inputPassElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let errors = compiled.getElementsByTagName('mat-error');
    expect(errors).toHaveLength(0);
    const loginBtn = compiled.getElementsByTagName('button')[0];
    loginBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let snackBar = jest.spyOn(component.snackBar, 'openFromComponent');
    const spy = jest.spyOn(service, 'login');
    component.onLogin();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('pat@gmail.com', '1');
    expect(snackBar).toHaveBeenCalledWith(SnackbarComponent, {
      data: 'Sorry, such user dos not exist.',
      duration: 3000,
    });
  });

  it('should submit value successfully', () => {
    const compiled = fixture.debugElement.nativeElement;
    const inputEmailElement = fixture.debugElement.query(
      By.css('.emailInput')
    ).nativeElement;
    const inputPassElement = fixture.debugElement.query(
      By.css('.passInput')
    ).nativeElement;

    inputEmailElement.value = 'admin@gmail.com';
    inputPassElement.value = '1234';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputPassElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const loginBtn = compiled.getElementsByTagName('button')[0];
    loginBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let snackBar = jest.spyOn(component.snackBar, 'openFromComponent');
    const spy = jest.spyOn(service, 'login');
    component.onLogin();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('admin@gmail.com', '1234');
    expect(snackBar).toHaveBeenCalledWith(SnackbarComponent, {
      data: 'You have successfully logged in.',
      duration: 3000,
    });
  });

  it('should hide the form and show the message that the user is logged in', () => {
    component.isLoggedIn = true;
    const messageTitle =
      fixture.debugElement.nativeElement.getElementsByTagName(
        'mat-card-title'
      )[0];
    expect(messageTitle.innerHTML).toBe('You are logged in.');
  });
});
