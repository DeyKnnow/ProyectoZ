import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPlanetaPage } from './admin-planeta.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPlanetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPlanetaPageRoutingModule {}
