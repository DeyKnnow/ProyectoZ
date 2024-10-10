import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearFaccionPageRoutingModule } from './crear-faccion-routing.module';

import { CrearFaccionPage } from './crear-faccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearFaccionPageRoutingModule
  ],
  declarations: [CrearFaccionPage]
})
export class CrearFaccionPageModule {}
