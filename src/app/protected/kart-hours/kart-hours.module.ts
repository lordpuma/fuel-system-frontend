import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KartHoursRoutingModule } from './kart-hours-routing.module';
import { InsertComponent } from './insert/insert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    KartHoursRoutingModule
  ],
  declarations: [InsertComponent]
})
export class KartHoursModule { }
