import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPlanetaPageRoutingModule } from './crear-planeta-routing.module';

import { CrearPlanetaPage } from './crear-planeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPlanetaPageRoutingModule
  ],
  declarations: [CrearPlanetaPage]
})
export class CrearPlanetaPageModule {}
