import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SexoI } from 'src/app/common/models/sexo.models';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-listar-sexo',
  templateUrl: './listar-sexo.page.html',
  styleUrls: ['./listar-sexo.page.scss'],
})
export class ListarSexoPage implements OnInit {
  busquedaSexo: SexoI[] = [];
  sexos: SexoI[] = [];
  newSexo: SexoI;
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
    this.loadUserRoleAndSexo();
  }

  private async loadUserRoleAndSexo() {
    await this.getUserRole(); // Obtener el rol del usuario
    await this.loadSexos(); // Cargar los personajes
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  private async getUserRole() {
    const user = await this.afAuth.currentUser; // Obtener el usuario actual
    if (user) {
      this.userRole = await this.authService.getRole(user.uid); // Obtener el rol del usuario
    }
  }

  private async loadSexos() {
    const loading = await this.showLoading(); // Esperar a que el cargador sea presentado
    this.firestoreService.getCollectionChanges<SexoI>('Sexos', 'nombre').subscribe({
      next: cambios => {
        if (cambios) {
          this.sexos = cambios;
          this.busquedaSexo = [...this.sexos];
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
    this.busquedaSexo = query
      ? this.sexos.filter(sexo =>
          sexo.nombre.toLowerCase().includes(query)
        )
      : [...this.sexos];
  }

  edit(sexo: SexoI) {
    this.sexos.forEach(p => (p.isEditing = false));
    sexo.isEditing = true;
  }

  confirmarEdicion(sexo: SexoI) {
    sexo.isEditing = false;
    this.newSexo = sexo;
    this.save();
  }

  async deleteSexo(sexo: SexoI) {
    this.cargando = true;
    const loading = await this.showLoading();
    try {
      await this.firestoreService.deleteDocumentID("Sexos", sexo.id);
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
      await this.firestoreService.updateDocumentID(this.newSexo, "Sexos", this.newSexo.id);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando sexos...',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }

  trackByFn(index: number, sexo: SexoI): any {
    return sexo.id;
  }
}

