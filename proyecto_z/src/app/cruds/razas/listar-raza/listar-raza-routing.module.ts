import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarRazaPage } from './listar-raza.page';

const routes: Routes = [
  {
    path: '',
    component: ListarRazaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarRazaPageRoutingModule {}
