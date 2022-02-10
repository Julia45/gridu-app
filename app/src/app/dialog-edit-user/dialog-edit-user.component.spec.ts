import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const dialogMock = {
  close: () => { }
};

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditUserComponent ],
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {
            user: {
              first_name: "",
              email: "",
              last_name: ""
          }
        },
      },
        {provide: MatDialogRef, useValue: dialogMock}, 
        HttpClient, HttpHandler
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog modal', () => {
     jest.spyOn(component.dialogRef, "close");
     component.onNoClick();
     expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
