import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KartRoutingModule } from './kart-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, KartRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [ListComponent, NewComponent],
})
export class KartModule {}
