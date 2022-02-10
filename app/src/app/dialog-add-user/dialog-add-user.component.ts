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
    first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    last_name: ['', [Validators.required, Validators.email]],
    updated: [new Date().toISOString()]
  });

  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
  ) { }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
