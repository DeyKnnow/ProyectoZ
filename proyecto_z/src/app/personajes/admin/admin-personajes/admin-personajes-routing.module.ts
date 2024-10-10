import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPersonajesPage } from './admin-personajes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPersonajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPersonajesPageRoutingModule {}
