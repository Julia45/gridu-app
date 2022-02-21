import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from "./users/users.component"
import { UserProfileComponent} from "./user-profile/user-profile.component"
import { LogoutComponent } from "./logout/logout.component"
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  { path: '',   redirectTo: '/users', pathMatch: 'full'},
  { path: 'logout', component: LogoutComponent },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]  },
  { path: 'login', loadChildren: () => import('./lazy-login/lazy-login.module').then(m => m.LazyLoginModule) },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
