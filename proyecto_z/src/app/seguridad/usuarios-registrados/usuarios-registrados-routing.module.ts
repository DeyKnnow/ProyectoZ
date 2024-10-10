import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosRegistradosPage } from './usuarios-registrados.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosRegistradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRegistradosPageRoutingModule {}
