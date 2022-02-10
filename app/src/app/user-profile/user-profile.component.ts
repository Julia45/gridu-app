import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from "../user-service.service"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
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
    this.userSvc.getUser(id).subscribe((user) => {
      this.user = user;
    })
  }
}
