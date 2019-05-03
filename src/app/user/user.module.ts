import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule } from '@angular/forms'
import {RouterModule, Routes} from '@angular/router'
import { UserInfoComponent } from './user-info/user-info.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent, DashboardComponent, UserInfoComponent, EditUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'login', component:LoginComponent},
      {path:'signup', component:SignupComponent},
      {path:'dashboard', component: DashboardComponent},
      {path: 'user-info', component: UserInfoComponent},
      {path: 'edit/:userId', component: EditUserComponent}
    ]),
    FormsModule
  ]
})
export class UserModule {}
