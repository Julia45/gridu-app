import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.auth.logout()
    setTimeout(() => {
      this.router.navigate([`/login`]);
    }, 1000)
    
  }
}
