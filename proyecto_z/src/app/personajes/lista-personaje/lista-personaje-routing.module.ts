import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPersonajePage } from './lista-personaje.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPersonajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPersonajePageRoutingModule {}
