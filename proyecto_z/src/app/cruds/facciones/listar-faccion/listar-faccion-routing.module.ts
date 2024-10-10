import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarFaccionPage } from './listar-faccion.page';

const routes: Routes = [
  {
    path: '',
    component: ListarFaccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarFaccionPageRoutingModule {}
