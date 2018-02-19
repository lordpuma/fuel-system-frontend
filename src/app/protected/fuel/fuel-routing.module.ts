import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../auth/login-guard.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: 'protected',
    component: LayoutComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'fuel',
        component: ListComponent,
      },
      {
        path: 'fuel/new',
        component: NewComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule { }
