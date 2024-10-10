import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PlanetaI } from 'src/app/common/models/planetas.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-lista-planetas',
  templateUrl: './lista-planetas.page.html',
  styleUrls: ['./lista-planetas.page.scss'],
})
export class ListaPlanetasPage implements OnInit {
  busquedaPlanetas: PlanetaI[] = [];
  planetas: PlanetaI[] = [];
  newPlanetas: PlanetaI;
  cargando: boolean = false;
  userRole: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {
    // Llamar a los métodos para cargar el rol del usuario y los personajes cada vez que se accede a la página
    this.loadUserRoleAndPersonajes();
  }

  private async loadUserRoleAndPersonajes() {
    await this.getUserRole(); // Obtener el rol del usuario
    await this.loadPlanetas(); // Cargar los personajes
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  private async getUserRole() {
    const user = await this.afAuth.currentUser; // Obtener el usuario actual
    if (user) {
      this.userRole = await this.authService.getRole(user.uid); // Obtener el rol del usuario
    }
  }

  private async loadPlanetas() {
    const loading = await this.showLoading(); // Esperar a que el cargador sea presentado
    this.firestoreService.getCollectionChanges<PlanetaI>('Planetas', 'nombre').subscribe({
      next: cambios => {
        if (cambios) {
          this.planetas = cambios;
          this.busquedaPlanetas = [...this.planetas];
          this.cd.detectChanges();
        }
      },
      error: err => {
        console.error('Error loading personajes:', err);
      }
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.busquedaPlanetas = query
      ? this.planetas.filter(planeta =>
          planeta.nombre.toLowerCase().includes(query)
        )
      : [...this.planetas];
  }

  edit(planeta: PlanetaI) {
    this.planetas.forEach(p => (p.isEditing = false));
    planeta.isEditing = true;
  }

  confirmarEdicion(planeta: PlanetaI) {
    planeta.isEditing = false;
    this.newPlanetas = planeta;
    this.save();
  }

  async delete(planeta: PlanetaI) {
    this.cargando = true;
    const loading = await this.showLoading();
    try {
      await this.firestoreService.deleteDocumentID("Planetas", planeta.id);
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }

  async save() {
    this.cargando = true;
    const loading = await this.showLoading();
    try {
      await this.firestoreService.updateDocumentID(this.newPlanetas, "Personajes", this.newPlanetas.id);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando planetas...',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }

  trackByFn(index: number, planeta: PlanetaI): any {
    return planeta.id;
  }
}
