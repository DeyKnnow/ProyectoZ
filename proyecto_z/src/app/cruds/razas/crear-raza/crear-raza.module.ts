import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearRazaPageRoutingModule } from './crear-raza-routing.module';

import { CrearRazaPage } from './crear-raza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearRazaPageRoutingModule
  ],
  declarations: [CrearRazaPage]
})
export class CrearRazaPageModule {}
