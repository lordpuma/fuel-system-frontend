import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginGuardGuard } from '../auth/login-guard.guard';

const routes: Routes = [
  {
    path: 'protected',
    component: LayoutComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'fillup',
        loadChildren: './fillup/fillup.module#FillupModule',
      },
      {
        path: 'fuel',
        loadChildren: './fuel/fuel.module#FuelModule',
      },
      {
        path: 'kart',
        loadChildren: './kart/kart.module#KartModule',
      },
      {
        path: 'kart-hours',
        loadChildren: './kart-hours/kart-hours.module#KartHoursModule',
      },
      {
        path: 'tickets',
        loadChildren: './tickets/tickets.module#TicketsModule',
      },
      {
        path: 'electricity',
        loadChildren: './electricity/electricity.module#ElectricityModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
