import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PersonajeI } from 'src/app/common/models/personajes.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-crear-personaje',
  templateUrl: './crear-personaje.page.html',
  styleUrls: ['./crear-personaje.page.scss'],
})
export class CrearPersonajePage implements OnInit {

  personajes: PersonajeI[] = [];

  newPersonaje: PersonajeI;
  cargando: boolean = false;

  constructor(private firestoreService: FirestoreService, private loadingCtrl: LoadingController) {
    this.loadPersonajes();
    this.initPersonajes();
  }

  ngOnInit() {
  }

  loadPersonajes() {
    this.firestoreService.getCollectionChanges<PersonajeI>('Personajes').subscribe(cambios => {

      if (cambios) {
        this.personajes = cambios;
      }

    })
  }

  initPersonajes() {
    this.newPersonaje = {
      id: this.firestoreService.createIdDoc(),
      nombre: null,
      ki: null,
      maxKi: null,
      raza: null,
      sexo: null,
      descripcion: null,
      imagen: null,
      faccion: null,
    }
  }

  async save() {
    this.cargando = true;
    const loading = await this.showLoading(); 
  
    try {
      await this.firestoreService.createDocumentID(this.newPersonaje, "Personajes", this.newPersonaje.id);
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
