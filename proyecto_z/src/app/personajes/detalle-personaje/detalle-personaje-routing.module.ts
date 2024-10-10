import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePersonajePage } from './detalle-personaje.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePersonajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePersonajePageRoutingModule {}
