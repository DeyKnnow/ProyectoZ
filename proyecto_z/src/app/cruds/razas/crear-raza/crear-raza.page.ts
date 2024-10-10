import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RazaI } from 'src/app/common/models/raza.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-crear-raza',
  templateUrl: './crear-raza.page.html',
  styleUrls: ['./crear-raza.page.scss'],
})
export class CrearRazaPage implements OnInit {


  razas: RazaI[] = [];

  newRaza: RazaI;
  cargando: boolean = false;

  constructor(private firestoreService: FirestoreService,
     private loadingCtrl: LoadingController, private router: Router) {
    this.loadRazas();
    this.initRazas();
  }

  ngOnInit() {
  }

  loadRazas() {
    this.firestoreService.getCollectionChanges<RazaI>('Razas').subscribe(cambios => {

      if (cambios) {
        this.razas = cambios;
      }

    })
  }

  initRazas() {
    this.newRaza = {
      id: this.firestoreService.createIdDoc(),
      nombre: null,
    }
  }

  async save() {
    this.cargando = true;
    const loading = await this.showLoading();
    this.router.navigate(['/home']);
    try {
      await this.firestoreService.createDocumentID(this.newRaza, "Razas", this.newRaza.id);
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


