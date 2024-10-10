import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SexoI } from 'src/app/common/models/sexo.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-sexo',
  templateUrl: './sexo.page.html',
  styleUrls: ['./sexo.page.scss'],
})
export class SexoPage implements OnInit {

  sexos: SexoI[] = [];

  newSexo: SexoI;
  cargando: boolean = false;

  constructor(private firestoreService: FirestoreService,
     private loadingCtrl: LoadingController,private router: Router) {
    this.loadSexos();
    this.initSexos();
  }

  ngOnInit() {
  }

  loadSexos() {
    this.firestoreService.getCollectionChanges<SexoI>('Sexos').subscribe(cambios => {

      if (cambios) {
        this.sexos = cambios;
      }

    })
  }

  initSexos() {
    this.newSexo = {
      id: this.firestoreService.createIdDoc(),
      nombre: null,
    }
  }

  async save() {
    this.cargando = true;
    const loading = await this.showLoading(); 
    this.router.navigate(['/home']);
    try {
      await this.firestoreService.createDocumentID(this.newSexo, "Sexos", this.newSexo.id);
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

