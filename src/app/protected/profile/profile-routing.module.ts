import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuardGuard } from '../../auth/login-guard.guard';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: 'protected',
    component: LayoutComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
