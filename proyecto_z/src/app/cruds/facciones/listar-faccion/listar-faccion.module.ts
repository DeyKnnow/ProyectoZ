import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarFaccionPageRoutingModule } from './listar-faccion-routing.module';

import { ListarFaccionPage } from './listar-faccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarFaccionPageRoutingModule
  ],
  declarations: [ListarFaccionPage]
})
export class ListarFaccionPageModule {}
