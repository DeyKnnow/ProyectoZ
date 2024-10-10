import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPlanetasPage } from './lista-planetas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPlanetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPlanetasPageRoutingModule {}
