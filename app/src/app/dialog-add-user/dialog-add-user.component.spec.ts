import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from '@angular/material/input';
import { DialogAddUserComponent } from './dialog-add-user.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const dialogMock = {
  close: () => { }
};

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddUserComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { 
        provide: MatDialogRef,
        useValue: dialogMock
         }, 
        { 
        provide: MAT_DIALOG_DATA, 
        useValue: [] 
        }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserComponent);
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
