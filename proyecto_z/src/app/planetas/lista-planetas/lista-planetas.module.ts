import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPlanetasPageRoutingModule } from './lista-planetas-routing.module';

import { ListaPlanetasPage } from './lista-planetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPlanetasPageRoutingModule
  ],
  declarations: [ListaPlanetasPage]
})
export class ListaPlanetasPageModule {}
