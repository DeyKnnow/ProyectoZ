import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosRegistradosPageRoutingModule } from './usuarios-registrados-routing.module';

import { UsuariosRegistradosPage } from './usuarios-registrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosRegistradosPageRoutingModule
  ],
  declarations: [UsuariosRegistradosPage]
})
export class UsuariosRegistradosPageModule {}
