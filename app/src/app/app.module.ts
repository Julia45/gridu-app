import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {AuthGuardService} from "./auth-guard.service"
import { MatFormFieldModule } from "@angular/material/form-field"
import { UserServiceService } from "./user-service.service";
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LogoutComponent } from './logout/logout.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptorProvider } from './interceptor';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DialogAddUserComponent,
    DialogDeleteUserComponent,
    DialogEditUserComponent,
    UserProfileComponent,
    PaginationComponent,
    UsersComponent,
    LogoutComponent,
    SnackbarComponent,
    PageNotFoundComponent,
    GamesComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    StoreModule.forRoot({ user: userReducer })
  ],
  providers: [UserServiceService, AuthGuardService, AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
