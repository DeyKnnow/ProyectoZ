import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.page.html',
  styleUrls: ['./panel-admin.page.scss'],
})
export class PanelAdminPage implements OnInit {
  public appPagesAdmin: any = [];
  userRole: string | null = null;
  usuario: { nombre: string; email: string | null; apellido?: string; raza: string; role?: string; } = {
    nombre: 'Forastero',
    email: null,
    raza: 'Soldado de clase baja',
  };
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usuario.nombre = user.displayName;
        this.usuario.email = user.email;

        this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe((usuarioData: any) => {
          if (usuarioData) {
            this.usuario.apellido = usuarioData.apellido;
            this.usuario.raza = usuarioData.raza;
            this.usuario.role = usuarioData.role;

            // Cargar el rol del usuario y las páginas
            this.userRole = usuarioData.role; // Asegúrate de que el rol se obtenga correctamente
          }
          this.loadAppPagesAdmin(); // Carga las páginas aquí, después de obtener el rol
          console.log('Datos del usuario autenticado:', this.usuario);
        });
      } else {
        console.log('No hay usuario autenticado');
        this.loadAppPagesAdmin(); // Carga las páginas también cuando no hay usuario autenticado
      }
    });
  }

  loadAppPagesAdmin() {
    if (this.userRole === 'admin') {
      this.appPagesAdmin.push({ title: 'Crear personaje', url: '/personajes/crear-personaje', icon: 'add' }),
        this.appPagesAdmin.push({ title: 'Crear planeta', url: '/planetas/crear-planeta', icon: 'add' }),
        this.appPagesAdmin.push({ title: 'Crear sexo', url: '/cruds/sexos/crear-sexo', icon: 'add' }),
        this.appPagesAdmin.push({ title: 'Crear facción', url: '/cruds/facciones/crear-faccion', icon: 'add' }),
        this.appPagesAdmin.push({ title: 'Crear raza', url: '/cruds/razas/crear-raza', icon: 'add' }),
        this.appPagesAdmin.push({ title: 'Lista de usuario', url: '/usuarios-registrados', icon: 'folder' });
    }


  }

}

