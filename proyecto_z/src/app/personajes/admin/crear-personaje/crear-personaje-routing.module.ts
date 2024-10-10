import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPersonajePage } from './crear-personaje.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPersonajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPersonajePageRoutingModule {}
