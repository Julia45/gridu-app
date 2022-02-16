import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserServiceService } from "../user-service.service"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();
  user = {
    last_name: "",
    email: "",
    first_name: "",
  };

  constructor(private userSvc: UserServiceService, 
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.userSvc.getUser(id).pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
