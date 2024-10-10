import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePlanetaPageRoutingModule } from './detalle-planeta-routing.module';

import { DetallePlanetaPage } from './detalle-planeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePlanetaPageRoutingModule
  ],
  declarations: [DetallePlanetaPage]
})
export class DetallePlanetaPageModule {}
