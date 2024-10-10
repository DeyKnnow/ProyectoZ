import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarRazaPageRoutingModule } from './listar-raza-routing.module';

import { ListarRazaPage } from './listar-raza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarRazaPageRoutingModule
  ],
  declarations: [ListarRazaPage]
})
export class ListarRazaPageModule {}
