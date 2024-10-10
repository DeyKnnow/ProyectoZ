import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: any = [];
  isActive = false;
  userRole: string | null = null;

  usuario: { nombre: string; email: string ; apellido?: string; raza: string; role?: string; } = {
    nombre: 'Forastero',
    email: 'ejemplo@gmail.com',
    apellido: 'Mr Aragna',
    raza: 'Soldado de clase baja',
  };

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) { }

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
            this.usuario.nombre = usuarioData.nombre;

            // Cargar el rol del usuario y las páginas
            this.userRole = usuarioData.role; // Asegúrate de que el rol se obtenga correctamente
          }
          this.loadAppPages(); // Carga las páginas aquí, después de obtener el rol
          console.log('Datos del usuario autenticado: app', this.usuario);
        });
      } else {
        console.log('No hay usuario autenticado');
        this.loadAppPages(); // Carga las páginas también cuando no hay usuario autenticado
      }
    });
  }


  loadAppPages() {
    this.appPages = [
      { title: 'Lista de personajes', url: '/personajes/lista-personaje', icon: 'person' },
      { title: 'Planetas', url: '/planetas/lista-planetas', icon: 'planet' },
    ];
    if (this.userRole === 'admin') {
      this.appPages.push({ title: 'Panel Administrador', url: '/admin/panel-admin', icon: 'cash'});
    }
    

  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  goToProfile() {
    this.authService.isAuthenticated().then(isAuth => {
      
      if (isAuth) {
        this.router.navigate(['perfil']);
      }
      else {
        this.router.navigate(['/seguridad/login']);
      }
    }).catch(error => {
      console.error('Error al verificar autenticación:', error);
      this.router.navigate(['/seguridad/login']);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Usuario ha cerrado sesión');
      this.router.navigate(['/seguridad/login']);
      window.location.reload(); // Recargar la página
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
