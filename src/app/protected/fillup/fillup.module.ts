import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FillupRoutingModule } from './fillup-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FillupRoutingModule
  ],
  declarations: [ListComponent, NewComponent]
})
export class FillupModule { }
