import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarSexoPageRoutingModule } from './listar-sexo-routing.module';

import { ListarSexoPage } from './listar-sexo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarSexoPageRoutingModule
  ],
  declarations: [ListarSexoPage]
})
export class ListarSexoPageModule {}
