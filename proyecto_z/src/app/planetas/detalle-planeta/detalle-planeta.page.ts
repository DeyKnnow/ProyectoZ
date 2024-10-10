import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PlanetaI } from 'src/app/common/models/planetas.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-planeta',
  templateUrl: './detalle-planeta.page.html',
  styleUrls: ['./detalle-planeta.page.scss'],
})
export class DetallePlanetaPage implements OnInit {
  planeta: PlanetaI | null = null;
  cargando: boolean = false;
  userRole: string | null = null;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUserRoleAndPlaneta();
  }

  private async loadUserRoleAndPlaneta() {
    await this.getUserRole(); // Obtener el rol del usuario
    await this.loadPlaneta(); // Cargar el personaje
  }

  private async getUserRole() {
    const user = await this.afAuth.currentUser; // Obtener el usuario actual
    if (user) {
      this.userRole = await this.authService.getRole(user.uid); // Obtener el rol del usuario
    }
  }

  private async loadPlaneta() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.firestoreService.getDocument<PlanetaI>(`Planetas/${id}`).then((doc) => {
        if (doc.exists()) {
          this.planeta = doc.data() as PlanetaI;
          this.cd.detectChanges(); // Forzar la detección de cambios
        }
      });
    }
  }

  async save() {
    if (this.planeta) {
      this.cargando = true;
      const loading = await this.showLoading();
      try {
        await this.firestoreService.updateDocumentID(this.planeta, "Planetas", this.planeta.id);
        this.isEditing = false; // Desactivar modo edición
      } catch (error) {
        console.error('Error al guardar:', error);
      } finally {
        this.cargando = false;
        loading.dismiss();
      }
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

  toggleEdit() {
    this.isEditing = !this.isEditing; // Alternar modo edición
  }

  
}

