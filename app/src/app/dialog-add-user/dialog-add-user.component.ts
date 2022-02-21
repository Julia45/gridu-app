import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    last_name: ['', [Validators.required]],
    updated: [new Date().toISOString()]
  });
  showErrors = false;
  errorText = "";

  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
  ) { }

  public handleError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
  }

  onAddUser(myForm) {
    if (myForm.status !== "INVALID") {
      this.dialogRef.close(myForm);
    } else {
      this.showErrors = true
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
