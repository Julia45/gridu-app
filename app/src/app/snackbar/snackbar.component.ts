import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  template: '{{ data }}',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
}
