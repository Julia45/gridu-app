import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent implements OnInit {
  deleteUser: boolean

  constructor() { }

  ngOnInit(): void {
  }

}
