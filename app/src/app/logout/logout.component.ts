import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.auth.logout();
    localStorage.removeItem("user")
    setTimeout(() => {
      this.router.navigate([`/login`]);
    }, 1000)
    
  }
}
