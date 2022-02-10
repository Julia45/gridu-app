import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<DialogEditUserComponent>,) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      first_name: [this.data.user.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      last_name: [this.data.user.last_name, [Validators.required, Validators.email]],
      updated: [new Date().toISOString()]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
