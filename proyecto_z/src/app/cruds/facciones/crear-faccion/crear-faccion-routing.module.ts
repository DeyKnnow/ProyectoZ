import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearFaccionPage } from './crear-faccion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearFaccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearFaccionPageRoutingModule {}
