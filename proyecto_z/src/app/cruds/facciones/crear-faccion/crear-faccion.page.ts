import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FaccionI } from 'src/app/common/models/facciones.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-crear-faccion',
  templateUrl: './crear-faccion.page.html',
  styleUrls: ['./crear-faccion.page.scss'],
})
export class CrearFaccionPage implements OnInit {

 

  facciones: FaccionI[] = [];

  newFaccion: FaccionI;
  cargando: boolean = false;

  constructor(private firestoreService: FirestoreService,
     private loadingCtrl: LoadingController, private router: Router) {
    this.loadFacciones();
    this.initFacciones();
  }

  ngOnInit() {
  }

  loadFacciones() {
    this.firestoreService.getCollectionChanges<FaccionI>('Facciones').subscribe(cambios => {

      if (cambios) {
        this.facciones = cambios;
      }

    })
  }

  initFacciones() {
    this.newFaccion = {
      id: this.firestoreService.createIdDoc(),
      nombre: null,
      lider: null,
    }
  }

  async save() {
    this.cargando = true;
    const loading = await this.showLoading();
    this.router.navigate(['/home']);
    try {
      await this.firestoreService.createDocumentID(this.newFaccion, "Facciones", this.newFaccion.id);
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
