import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SexoPageRoutingModule } from './sexo-routing.module';

import { SexoPage } from './sexo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SexoPageRoutingModule
  ],
  declarations: [SexoPage]
})
export class SexoPageModule {}
