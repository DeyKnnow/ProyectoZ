import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarSexoPage } from './listar-sexo.page';

const routes: Routes = [
  {
    path: '',
    component: ListarSexoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarSexoPageRoutingModule {}
