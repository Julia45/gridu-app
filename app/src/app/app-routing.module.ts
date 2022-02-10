import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from "./users/users.component"
// import { LoginComponent } from "./login/login.component"
import { UserProfileComponent} from "./user-profile/user-profile.component"
import { LogoutComponent } from "./logout/logout.component"
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]  },
  { path: 'login', loadChildren: () => import('./lazy-login/lazy-login.module').then(m => m.LazyLoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
