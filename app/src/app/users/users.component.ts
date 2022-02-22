import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from "../dialog-add-user/dialog-add-user.component"
import  {UserServiceService } from '../user-service.service'
import { Subject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteUserComponent } from "../dialog-delete-user/dialog-delete-user.component"
import { DialogEditUserComponent } from "../dialog-edit-user/dialog-edit-user.component"
import { takeUntil, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

interface User {
  email: string;
  role: string;
  password: string;
  token?: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  unsubscribe = new Subject();
  darkTheme = false;
  length: string;
  page: number = 0;
  previousPageIndex: number;
  pageSize: number = 10;
  user: any;
  isUserAdmin: boolean;
  usersList: MatTableDataSource<any> = new MatTableDataSource<User>([]);
  subscription: Subscription;
  displayedColumns: string[] = ['email', 'first_name', 'last_name', 'action', 'isParticipator', "updated"];

  constructor(
    public dialog: MatDialog, 
    private userSvc: UserServiceService,
    private router: Router,
    private store: Store<any>
    ) { }

  ngOnInit(): void {
    this.store.subscribe((data) => {
      this.darkTheme = data.theme.name === "dark"
    })
    this.isUserAdmin = JSON.parse(localStorage.getItem("user")).role === "admin"
      if (!this.isUserAdmin) {
        this.displayedColumns = this.displayedColumns.filter(word => word !== "action");
      }
    this.getAllUsers(this.page + 1, this.pageSize);
  }

  paginationChange(page: {pageSize: number, pageIndex: number }) {
      this.pageSize = page.pageSize;
      this.page = page.pageIndex;
      this.getAllUsers(this.page + 1, this.pageSize)
    }
    
  getAllUsers(page, pageSize) {
    this.userSvc.getUsers(page, pageSize)
    .pipe(
      map((val: any) => {
        return {
          ...val,
          users: val.users.map(element => {
          return {...element, updated: new Date(element.updated)};
        })
      }
      } ),
      takeUntil(this.unsubscribe)
      )
    .subscribe((res) => {
      this.usersList.data = res.users;
      this.length = res.total
    })
  }

  openEditUserDialog (user) {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: {user: user},
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        this.userSvc.updateUser(user.id, result.value).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.getAllUsers(this.page + 1, this.pageSize)
        })
      }
    });
  }

  openDeleteUserDialog(user) {
    const dialogRef = this.dialog.open(DialogDeleteUserComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        this.userSvc.deleteUser(user.id).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.page = 0;
          this.getAllUsers(this.page + 1, this.pageSize)
      })
      }
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if(result) {
        this.userSvc.addUser(result.value).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.getAllUsers(this.page  + 1, this.pageSize)
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
