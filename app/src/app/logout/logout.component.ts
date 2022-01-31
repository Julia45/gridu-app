import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.logout()
  }
}
