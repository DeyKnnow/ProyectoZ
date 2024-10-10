import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePlanetaPage } from './detalle-planeta.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePlanetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePlanetaPageRoutingModule {}
