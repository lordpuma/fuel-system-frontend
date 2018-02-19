import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelRoutingModule } from './fuel-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FuelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ListComponent, NewComponent]
})
export class FuelModule { }
