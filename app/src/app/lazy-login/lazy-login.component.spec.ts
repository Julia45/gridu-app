import { ComponentFixture, fakeAsync, TestBed, tick, async } from '@angular/core/testing';
import { LoginComponent } from './lazy-login.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from "@angular/platform-browser";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../auth.service'
import { SnackbarComponent } from "../snackbar/snackbar.component"
import { AuthGuardService } from '../auth-guard.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let snackBar: MatSnackBar;
  let service: AuthenticationService;
  let authGuardService: AuthenticationService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, SnackbarComponent ],
      imports: [
        MatCardModule, 
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [ 
        MatSnackBar, 
        AuthenticationService, AuthGuardService]
    })
    .compileComponents();
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

  it("should show the form when loggin in", () => {
    component.isLoggedIn = false;
    const compiled = fixture.debugElement.nativeElement;
    let inputs = compiled.getElementsByTagName("input");
    expect(inputs).toHaveLength(2)
    let inputsLabels = compiled.getElementsByTagName("mat-label");
    expect(inputsLabels[0].innerHTML).toBe("Email")
    expect(inputsLabels[1].innerHTML).toBe("Password");
  })

  it("should show the error when the inputs are not valid", () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const inputEmailElement = fixture.debugElement.query(By.css('.emailInput')).nativeElement;
    inputEmailElement.value = 'unvalid email';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'))
    fixture.detectChanges();
    let emailError = compiled.getElementsByTagName("mat-error")[0];
    expect(emailError.innerHTML).toBe("Please enter email")
    const inputPassElement = fixture.debugElement.query(By.css('.passInput')).nativeElement;
    inputPassElement.value = '';
    inputPassElement.dispatchEvent(new Event('input'));
    inputPassElement.dispatchEvent(new Event('blur'))
    fixture.detectChanges();
    let passError = compiled.getElementsByTagName("mat-error")[1];
    expect(passError.innerHTML).toBe("Password is required")
    inputEmailElement.value = '';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'))
    fixture.detectChanges();
    let emailRequiredError = compiled.getElementsByTagName("mat-error")[0];
    expect(emailRequiredError.innerHTML).toBe("This field is required")
  })

  it("should submit value, but inform that thwe user does not exsist", () => {
    const compiled = fixture.debugElement.nativeElement;
    const inputEmailElement = fixture.debugElement.query(By.css('.emailInput')).nativeElement;
    const inputPassElement = fixture.debugElement.query(By.css('.passInput')).nativeElement;

    inputEmailElement.value = 'pat@gmail.com';
    inputPassElement.value = '1';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputEmailElement.dispatchEvent(new Event('blur'));
    inputPassElement.dispatchEvent(new Event('input'))
    fixture.detectChanges();
    let errors = compiled.getElementsByTagName("mat-error");
    expect(errors).toHaveLength(0);
    const loginBtn = compiled.getElementsByTagName("button")[0];
    loginBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let snackBar = jest.spyOn(component.snackBar, 'openFromComponent');
    const spy = jest.spyOn(service, "login")
    component.onLogin();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith("pat@gmail.com", "1");
    expect(snackBar).toHaveBeenCalledWith(SnackbarComponent, 
      {"data": "Sorry, such user dos not exist.", "duration": 3000});
  })

  it("should submit value successfully", () => {
    const compiled = fixture.debugElement.nativeElement;
    const inputEmailElement = fixture.debugElement.query(By.css('.emailInput')).nativeElement;
    const inputPassElement = fixture.debugElement.query(By.css('.passInput')).nativeElement;

    inputEmailElement.value = 'admin@gmail.com';
    inputPassElement.value = '1234';
    inputEmailElement.dispatchEvent(new Event('input'));
    inputPassElement.dispatchEvent(new Event('input'))
    inputEmailElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const loginBtn = compiled.getElementsByTagName("button")[0];
    loginBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let snackBar = jest.spyOn(component.snackBar, 'openFromComponent');
    const spy = jest.spyOn(service, "login")
    component.onLogin();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith("admin@gmail.com", "1234");
    expect(snackBar).toHaveBeenCalledWith(SnackbarComponent, 
      {"data": "You have successfully logged in.", "duration": 3000});
   
  })

  it("should hide the form and show the message that the user is logged in", () => {
    component.isLoggedIn = true;
    const messageTitle = fixture.debugElement.nativeElement.getElementsByTagName("mat-card-title")[0];
    expect(messageTitle.innerHTML).toBe("You are logged in.");
    const messageSubTitle = fixture.debugElement.nativeElement.getElementsByTagName("mat-card-subtitle")[0];
    expect(messageSubTitle.innerHTML).toBe(" Please navigate to <a ng-reflect-router-link=\"/logout\" href=\"/logout\">logout</a> page to log in. ");

  })
  

  it("should redirect a user to logout page when clicked", () => {
    component.isLoggedIn = true;
    const logoutLink = fixture.debugElement.nativeElement.getElementsByTagName("a")[0];
    let href = logoutLink.getAttribute('href');
    expect(href).toEqual('/logout');

    logoutLink.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));   
    let routerLinks = linkDes.map(de=>de.injector.get(RouterLinkWithHref));   
    expect(routerLinks[0].href).toBe('/logout');
  })
});

