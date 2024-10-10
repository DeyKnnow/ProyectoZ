import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaPersonajePageRoutingModule } from './lista-personaje-routing.module';
import { ListaPersonajePage } from './lista-personaje.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPersonajePageRoutingModule,
  ],
  declarations: [ListaPersonajePage]
})
export class ListaPersonajePageModule {}
