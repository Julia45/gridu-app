import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from "../dialog-add-user/dialog-add-user.component"
import  {UserServiceService } from '../user-service.service'
import { Subject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {DialogDeleteUserComponent} from "../dialog-delete-user/dialog-delete-user.component"
import {DialogEditUserComponent} from "../dialog-edit-user/dialog-edit-user.component"
import { takeUntil, tap, map } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();
  length: string
  usersList: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  subscription: Subscription;
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'action', 'isParticipator', "updated"];

  constructor(
    public dialog: MatDialog, 
    private userSvc: UserServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): any {
    this.userSvc.getUsers()
    .pipe(
      tap(val => console.log(val)),
      map((val) => {
        return val.map(element => {
          return {...element, updated: new Date(element.updated)};
        });
      } ),
      takeUntil(this.unsubscribe)
      )
    .subscribe((res) => {
      this.usersList.data = res;
      this.length = (res.length).toString()
    })
  }

  openEditUserDialog (user) {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      width: '250px',
      data: {user: user},
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        this.userSvc.updateUser(user.id, result.value).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.getAllUsers()
        })
      }
    });
  }

  openDeleteUserDialog(user) {
    const dialogRef = this.dialog.open(DialogDeleteUserComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        this.userSvc.deleteUser(user.id).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.getAllUsers()
      })
      }
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if(result) {
        this.userSvc.addUser(result.value).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.getAllUsers()
        })
      }
    });
  }

  onClick (element) {
    this.router.navigate([`users/${element.id}`]);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
