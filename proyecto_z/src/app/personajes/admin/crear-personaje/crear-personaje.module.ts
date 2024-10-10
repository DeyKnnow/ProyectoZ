import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPersonajePageRoutingModule } from './crear-personaje-routing.module';

import { CrearPersonajePage } from './crear-personaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPersonajePageRoutingModule
  ],
  declarations: [CrearPersonajePage]
})
export class CrearPersonajePageModule {}
