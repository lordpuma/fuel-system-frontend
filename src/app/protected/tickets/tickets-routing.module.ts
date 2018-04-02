import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertComponent } from './insert/insert.component';

const routes: Routes = [
  {
    path: 'insert',
    component: InsertComponent,
  },
  {
    path: '**',
    redirectTo: 'insert',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
