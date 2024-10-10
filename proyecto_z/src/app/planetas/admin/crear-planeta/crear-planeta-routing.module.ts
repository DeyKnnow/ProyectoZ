import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPlanetaPage } from './crear-planeta.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPlanetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPlanetaPageRoutingModule {}
