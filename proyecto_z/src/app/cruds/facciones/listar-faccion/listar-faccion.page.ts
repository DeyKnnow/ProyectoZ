import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { FaccionI } from 'src/app/common/models/facciones.models';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-listar-faccion',
  templateUrl: './listar-faccion.page.html',
  styleUrls: ['./listar-faccion.page.scss'],
})
export class ListarFaccionPage implements OnInit {

  busquedaFaccion: FaccionI[] = [];
  facciones: FaccionI[] = [];
  newFaccion: FaccionI;
  cargando: boolean = false;
  userRole: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {
    // Llamar a los métodos para cargar el rol del usuario y los personajes cada vez que se accede a la página
    this.loadUserRoleAndFaccion();
  }

  private async loadUserRoleAndFaccion() {
    await this.getUserRole(); // Obtener el rol del usuario
    await this.loadFaccion(); // Cargar los personajes
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  private async getUserRole() {
    const user = await this.afAuth.currentUser; // Obtener el usuario actual
    if (user) {
      this.userRole = await this.authService.getRole(user.uid); // Obtener el rol del usuario
    }
  }

  private async loadFaccion() {
    const loading = await this.showLoading(); // Esperar a que el cargador sea presentado
    this.firestoreService.getCollectionChanges<FaccionI>('Facciones', 'nombre').subscribe({
      next: cambios => {
        if (cambios) {
          this.facciones = cambios;
          this.busquedaFaccion = [...this.facciones];
          this.cd.detectChanges();
        }
      },
      error: err => {
        console.error('Error loading sexos:', err);
      }
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.busquedaFaccion = query
      ? this.facciones.filter(facciones =>
        facciones.nombre.toLowerCase().includes(query)
        )
      : [...this.facciones];
  }

  edit(faccion: FaccionI) {
    this.facciones.forEach(p => (p.isEditing = false));
    faccion.isEditing = true;
  }

  confirmarEdicion(faccion: FaccionI) {
    faccion.isEditing = false;
    this.newFaccion = faccion;
    this.save();
  }

  async deleteFaccion(faccion: FaccionI) {
    this.cargando = true;
    const loading = await this.showLoading();
    try {
      await this.firestoreService.deleteDocumentID("Facciones", faccion.id);
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
      await this.firestoreService.updateDocumentID(this.newFaccion, "Facciones", this.newFaccion.id);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando facciones...',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }

  trackByFn(index: number, faccion: FaccionI): any {
    return faccion.id;
  }
}

