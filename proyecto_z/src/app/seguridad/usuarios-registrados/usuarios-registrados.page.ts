import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

import { UsuarioI } from 'src/app/common/models/usuario.models';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.page.html',
  styleUrls: ['./usuarios-registrados.page.scss'],
})
export class UsuariosRegistradosPage implements OnInit {
  usuarios: UsuarioI[] = [];
  isEditing: boolean = false;
  editingUsuario: UsuarioI | null = null;
  userRole: string | null = null;

  usuario: { nombre: string; email: string; apellido?: string; raza: string; role?: string; } = {
    nombre: 'Forastero',
    email: 'ejemplo@gmail.com',
    apellido: 'Mr Aragna',
    raza: 'Soldado de clase baja',
    role: 'usuario',
  };
  constructor(private firestore: AngularFirestore,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Obtener los datos del usuario desde Firestore
        this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe((usuarioData: any) => {
          if (usuarioData) {
            this.userRole = usuarioData.role; // Asegúrate de que el rol se obtenga correctamente
            
            // Verificar si el usuario es admin
            if (this.userRole !== 'admin') {
              this.puedoseradmin(); // Mostrar alerta si no es admin
            } else {
              this.getUsuarios(); // Solo obtener usuarios si es admin
            }
          }
        });
      } else {
        console.log('No hay usuario autenticado');
        this.puedoseradmin();
      }
    });
  }
  
  async puedoseradmin() {
    const alert = await this.alertController.create({
      header: 'Acceso Denegado',
      message: 'No tienes permisos para acceder a esta página.',
      buttons: [{
        text: 'OK',

        handler: () => {
  
          this.router.navigate(['/home']); // Cambia a la página deseada
        }
      }]
    });
    
    await alert.present(); // Muestra la alerta
  }

getUsuarios() {
  this.firestore.collection<UsuarioI>('usuarios', ref => ref.orderBy('nombre')).valueChanges().subscribe((usuarios: UsuarioI[]) => {
    this.usuarios = usuarios;
    console.log('Usuarios obtenidos en orden:', this.usuarios);
  }, error => {
    console.error('Error al obtener usuarios:', error);
  });
}

selectUsuarioForEdit(usuario: UsuarioI) {
  this.isEditing = true;
  this.editingUsuario = { ...usuario }; // Clonamos el objeto para no modificar la lista original directamente
}

async onSubmit() {
  try {
    if (this.editingUsuario && this.editingUsuario.email) {
      // Preparar los datos a actualizar para el usuario seleccionado
      const updateData = {
        apellido: this.editingUsuario.apellido,
        raza: this.editingUsuario.raza,
        nombre: this.editingUsuario.nombre,
        role: this.editingUsuario.role,
      };

      // Obtener el documento en Firestore por su correo electrónico
      const userDoc = await this.firestore.collection('usuarios', ref => ref.where('email', '==', this.editingUsuario.email)).get().toPromise();
      
      if (!userDoc.empty) {
        const docId = userDoc.docs[0].id;

        // Actualizar el documento en Firestore
        await this.firestoreService.updateDocument(updateData, `usuarios/${docId}`);

        // Actualizar el usuario en la lista local
        this.usuarios = this.usuarios.map(usr => {
          if (usr.email === this.editingUsuario!.email) {
            return { ...usr, ...updateData }; // Actualizar los datos del usuario modificado
          }
          return usr; // Dejar los demás usuarios intactos
        });

        // Mostrar una alerta de éxito
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Los cambios han sido guardados correctamente.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.isEditing = false; // Cierra el formulario de edición
              this.editingUsuario = null; // Limpiar el usuario en edición
            }
          }]
        });
        await alert.present();
      } else {
        console.error('No se encontró el documento del usuario con ese email');
      }
    } else {
      console.error('No hay usuario seleccionado o no se pudo obtener el email');
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);

    // Mostrar una alerta de error
    const errorAlert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un problema al guardar los cambios. Inténtalo nuevamente.',
      buttons: ['OK']
    });
    await errorAlert.present();
  }
}

async eliminarUsuario(email: string) {
  try {
    // Obtener el documento en Firestore por el correo electrónico
    const userDoc = await this.firestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();

    if (!userDoc.empty) {
      const docId = userDoc.docs[0].id;

      // Eliminar el documento de Firestore
      await this.firestore.collection('usuarios').doc(docId).delete();

      // Actualizar la lista local de usuarios
      this.usuarios = this.usuarios.filter(usr => usr.email !== email);

      // Mostrar una alerta de éxito
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'El usuario ha sido eliminado correctamente.',
        buttons: [{
          text: 'OK',
          handler: () => {
            // Recargar la página
            window.location.reload();
          }
        }]
      });
      await alert.present();
    } else {
      console.error('No se encontró el documento del usuario con ese email');
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se encontró un usuario con ese correo electrónico.',
        buttons: ['OK']
      });
      await alert.present();
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);

    // Mostrar una alerta de error
    const errorAlert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un problema al eliminar el usuario. Inténtalo nuevamente.',
      buttons: ['OK']
    });
    await errorAlert.present();
  }
}
}