import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PersonajeI } from 'src/app/common/models/personajes.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-admin-personajes',
  templateUrl: './admin-personajes.page.html',
  styleUrls: ['./admin-personajes.page.scss'],
})
export class AdminPersonajesPage {

  busquedaPersonajes: PersonajeI[] = [];
  personajes: PersonajeI[] = [];
  newPersonaje: PersonajeI;
  cargando: boolean = false;


  constructor(private firestoreService: FirestoreService, private loadingCtrl: LoadingController) {
    this.loadPersonajes();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();

    if (query) {
      this.busquedaPersonajes = this.personajes.filter(personaje =>
        personaje.nombre.toLowerCase().includes(query)
      );
    } else {

      this.busquedaPersonajes = [...this.personajes];
    }
  }

  loadPersonajes() {
    this.firestoreService.getCollectionChanges<PersonajeI>('Personajes', 'nombre').subscribe({
      next: cambios => {
        if (cambios) {
          this.personajes = cambios;
          // Inicializamos busquedaPersonajes con todos los personajes
          this.busquedaPersonajes = [...this.personajes];
        }
      },
      error: err => {
        console.error('Error loading personajes:', err);
      }
    });
  }

  edit(personaje: PersonajeI) {
    this.personajes.forEach(p => p.isEditing = false);

    personaje.isEditing = true;
  }

  confirmarEdicion(personaje: PersonajeI) {
    personaje.isEditing = false;
    this.newPersonaje = personaje;
    this.save();
  }

  async delete(personaje: PersonajeI) {
    this.cargando = true;
    const loading = await this.showLoading();
    try {
      await this.firestoreService.deleteDocumentID("Personajes", personaje.id);
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }







  trackByFn(index: number, personaje: PersonajeI): any {
    return personaje.id;
  }


  async save() {
    this.cargando = true;
    const loading = await this.showLoading();
    try {
      await this.firestoreService.updateDocumentID(this.newPersonaje, "Personajes", this.newPersonaje.id);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }
}
