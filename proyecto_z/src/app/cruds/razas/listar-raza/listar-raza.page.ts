import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { RazaI } from 'src/app/common/models/raza.models';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-listar-raza',
  templateUrl: './listar-raza.page.html',
  styleUrls: ['./listar-raza.page.scss'],
})
export class ListarRazaPage implements OnInit {

  busquedaRaza: RazaI[] = [];
  razas: RazaI[] = [];
  newRaza: RazaI;
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
    this.loadUserRoleAndRaza();
  }

  private async loadUserRoleAndRaza() {
    await this.getUserRole(); // Obtener el rol del usuario
    await this.loadRazas(); // Cargar los personajes
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  private async getUserRole() {
    const user = await this.afAuth.currentUser; // Obtener el usuario actual
    if (user) {
      this.userRole = await this.authService.getRole(user.uid); // Obtener el rol del usuario
    }
  }

  private async loadRazas() {
    const loading = await this.showLoading(); // Esperar a que el cargador sea presentado
    this.firestoreService.getCollectionChanges<RazaI>('Razas', 'nombre').subscribe({
      next: cambios => {
        if (cambios) {
          this.razas = cambios;
          this.busquedaRaza = [...this.razas];
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
    this.busquedaRaza = query
      ? this.razas.filter(razas =>
        razas.nombre.toLowerCase().includes(query)
        )
      : [...this.razas];
  }

  edit(raza: RazaI) {
    this.razas.forEach(p => (p.isEditing = false));
    raza.isEditing = true;
  }

  confirmarEdicion(raza: RazaI) {
    raza.isEditing = false;
    this.newRaza = raza;
    this.save();
  }

  async deleteRaza(raza: RazaI) {
    this.cargando = true;
    const loading = await this.showLoading();
    try {
      await this.firestoreService.deleteDocumentID("Razas", raza.id);
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
      await this.firestoreService.updateDocumentID(this.newRaza, "Razas", this.newRaza.id);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando razas...',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }

  trackByFn(index: number, raza: RazaI): any {
    return raza.id;
  }
}

