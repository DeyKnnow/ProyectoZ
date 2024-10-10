import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPersonajesPageRoutingModule } from './admin-personajes-routing.module';

import { AdminPersonajesPage } from './admin-personajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPersonajesPageRoutingModule
  ],
  declarations: [AdminPersonajesPage]
})
export class AdminPersonajesPageModule {}
