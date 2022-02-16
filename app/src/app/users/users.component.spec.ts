import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from "rxjs";

import { UsersComponent } from './users.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

const self: any = {};

const dialogRefStub = {
  afterClosed() {
    return of({ last_name: "first1",first_name: "first anme1",email: "first@gmail.com1", updated: new Date()});
  },
  open () {
    return of(true);
  }
};

const dialogStub = { open: () => dialogRefStub };
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let service: UserServiceService;
  let dialog: MatDialog;
  let overlay: Overlay;
  let overlayContainer: OverlayContainer;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ UsersComponent, UserProfileComponent ],
      providers: [HttpClient, HttpHandler,
        { provide: MatDialog,  useValue: dialogStub },
      ], 
      imports: [
        MatTableModule, 
        BrowserAnimationsModule, 
        MatIconModule, 
        MatPaginatorModule, 
        MatDialogModule, 
        RouterTestingModule
        .withRoutes(
          [{path: "users/1", component: UserProfileComponent}])
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(UserServiceService);
    dialog = fixture.debugElement.injector.get(MatDialog);
    overlayContainer = fixture.debugElement.injector.get(OverlayContainer);
    router = fixture.debugElement.injector.get(Router);


    fixture.detectChanges();
    self.spy = jest.spyOn(service, "getUsers").mockReturnValue(of([
      { last_name: "first",first_name: "first anme",email: "first@gmail.com", updated: new Date()},
      { last_name: "second",first_name: "second name",email: "second@gmail.com", updated: new Date()},
      { last_name: "third",first_name: "third name",email: "third@gmail.com", updated: new Date()},
      { last_name: "fourth",first_name: "fourth name",email: "fourth@gmail.com", updated: new Date()},
      { last_name: "fifth",first_name: "fifth name",email: "fifth@gmail.com", updated: new Date()},

    ]))
      component.getAllUsers(1, 5);
      component.ngOnInit();
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a table full of users', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let table = compiled.getElementsByTagName("table")[0]
    expect(table).toBeTruthy()
    let firstRow = compiled.getElementsByTagName("td")[0]
    expect(firstRow.innerHTML).toBe(" first@gmail.com ")
    expect(component.length).toBe("5")
  });

  it('should open deleteUser dialog when clicked on delete button', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    let deleteButton = compiled.getElementsByTagName('button')[2];
    deleteButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let dialogRef = jest
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of() } as MatDialogRef<
        typeof DialogEditUserComponent
      >);
    component.openEditUserDialog({
      last_name: 'first',
      first_name: 'first anme',
      email: 'first@gmail.com',
      updated: new Date(),
    });
    fixture.detectChanges();
    expect(dialogRef).toHaveBeenCalled();
    service.updateUser(1, {
      last_name: "",
      email: "",
      first_name: "",
      updated: new Date()
    })
  });

  it('should open deleteUser dialog when clicked on edit button', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    let editButton = compiled.getElementsByTagName("button")[1]
    editButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let dialogRef = jest.spyOn(dialog, 'open').mockReturnValue
    ({afterClosed: () => of(
      service.deleteUser(1)
      )} as MatDialogRef<typeof DialogEditUserComponent>);
    component.openDeleteUserDialog(
      { id: "1", last_name: "first",first_name: "first anme",email: "first@gmail.com", updated: new Date()},
    )
    fixture.detectChanges();
    component.dialog.open(DialogDeleteUserComponent)
    expect(dialogRef).toHaveBeenCalled();
    fixture.detectChanges();

  });

  it('should open addUser dialog when clicked on add user button', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    let addButton = compiled.getElementsByTagName("button")[0]
    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let dialogRef = jest.spyOn(dialog, 'open')
    component.openAddUserDialog()
    fixture.detectChanges();
    expect(dialogRef).toHaveBeenCalled();
    console.log(fixture.debugElement.nativeElement)
    //check add
  });

  it('should open userProfile when clicked on the user', () => {
    fixture.detectChanges();
    jest.spyOn(router, "navigateByUrl");
    component.onClick({id: 1});
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should change page', () => {
    fixture.detectChanges();
    component.paginationChange({
      pageSize: 5,
      pageIndex: 0
    });
    expect(component.pageSize).toBe(5)
    expect(component.page).toBe(1)
  });

});
