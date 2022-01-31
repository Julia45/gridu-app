import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from "../snackbar/snackbar.component"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private auth: AuthenticationService, 
    private snackBar: MatSnackBar
     ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  getUserEmailErrorMessage() {
   if (this.myForm.controls.email.errors?.required) {
     return "This field is required"
   } else if (this.myForm.controls.email.errors?.email) {
    return "Please enter email"
   } 
    return ""
   
  }


  onLogin () {
    console.log(this.myForm.status === "VALID")
    if (this.myForm.status === "VALID") {
      this.auth.login(this.myForm.value.email, this.myForm.value.password)
      .subscribe(() => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: 'You have successfully logged in.',
            duration: 3000
          });

          setTimeout(() => {
            this.router.navigate([`users/`]);
          }, 2000)
       
        }, () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: 'Sorry, such user dos not exist.',
            duration: 3000
          });
        })
    }
  
  }
}
