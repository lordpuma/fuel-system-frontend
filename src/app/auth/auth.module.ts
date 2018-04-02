import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginServiceService } from './login-service.service';
import { LoginGuardGuard } from './login-guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent],
  providers: [LoginServiceService, LoginGuardGuard],
})
export class AuthModule {}
