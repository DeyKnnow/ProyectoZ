import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PlanetaI } from 'src/app/common/models/planetas.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';


@Component({
  selector: 'app-crear-planeta',
  templateUrl: './crear-planeta.page.html',
  styleUrls: ['./crear-planeta.page.scss'],
})
export class CrearPlanetaPage implements OnInit {

  planetas: PlanetaI[] = [];

  newPlaneta: PlanetaI;
  cargando: boolean = false;

  constructor(private firestoreService: FirestoreService, private loadingCtrl: LoadingController) {
    this.loadPlanetas();
    this.initPlanetas();
  }

  ngOnInit() {
  }

  loadPlanetas() {
    this.firestoreService.getCollectionChanges<PlanetaI>('Planetas').subscribe(cambios => {

      if (cambios) {
        this.planetas = cambios;
      }

    })
  }

  initPlanetas() {
    this.newPlaneta = {
      id: this.firestoreService.createIdDoc(),
      nombre: null,
      destruido: null,
      descripcion: null,
      imagen: null,
      deleteAt: null,
    }
  }

  async save() {
    this.cargando = true;
    const loading = await this.showLoading(); 
  
    try {
      await this.firestoreService.createDocumentID(this.newPlaneta, "Planetas", this.newPlaneta.id);
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

