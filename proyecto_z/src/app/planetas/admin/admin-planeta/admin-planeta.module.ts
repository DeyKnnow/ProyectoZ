import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPlanetaPageRoutingModule } from './admin-planeta-routing.module';

import { AdminPlanetaPage } from './admin-planeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPlanetaPageRoutingModule
  ],
  declarations: [AdminPlanetaPage]
})
export class AdminPlanetaPageModule {}
