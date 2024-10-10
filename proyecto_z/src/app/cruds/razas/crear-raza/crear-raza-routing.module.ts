import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearRazaPage } from './crear-raza.page';

const routes: Routes = [
  {
    path: '',
    component: CrearRazaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearRazaPageRoutingModule {}
