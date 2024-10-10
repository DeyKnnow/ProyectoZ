import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SexoPage } from './sexo.page';

const routes: Routes = [
  {
    path: '',
    component: SexoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SexoPageRoutingModule {}
