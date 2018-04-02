import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityRoutingModule } from './electricity-routing.module';
import { InsertComponent } from './insert/insert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ElectricityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [InsertComponent, ListComponent],
})
export class ElectricityModule {}
