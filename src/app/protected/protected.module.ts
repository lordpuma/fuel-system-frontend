import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from '../auth/auth.module';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { FuelModule } from './fuel/fuel.module';
import { ProtectedRoutingModule } from './protected-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    // FuelModule,
    RouterModule,
    ClarityModule,
    ProtectedRoutingModule
  ],
  declarations: [LayoutComponent],
  providers: [AuthModule]
})
export class ProtectedModule { }
