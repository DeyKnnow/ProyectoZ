import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsuarioI } from '../models/usuario.models';
import { FirebaseError } from 'firebase-admin';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Guardar información del usuario

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {
  }

  // Registro de usuarios con email y contraseña
  // Registro de usuarios con email y contraseña
  async register(usuario: UsuarioI) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password);

      // Actualiza el perfil del usuario con el nombre
      await userCredential.user?.updateProfile({
        displayName: usuario.nombre
      });

      // Guarda la información del usuario en Firestore
      await this.firestore.collection('usuarios').doc(userCredential.user?.uid).set({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        raza: usuario.raza,
        role: 'usuario'
      });

      console.log('Usuario registrado:', userCredential);
      this.router.navigate(['home']);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error('Error al registrar el usuario:', firebaseError);
      window.alert(firebaseError.message);
    }
  }

  // Inicio de sesión con email y contraseña
  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      // Login exitoso
      console.log("Login exitoso");
    }).catch(error => {
      console.error('Error en login:', error);
      throw error; // Propaga el error para que pueda ser manejado donde se llama
    });
  }

  // Cierre de sesión
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
  async getRole(userId: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('usuarios').doc(userId).get().toPromise();
      if (userDoc.exists) {
        const data = userDoc.data() as UsuarioI;
        return data.role; // Asegúrate de que la propiedad se llama 'rol' y no 'role'
      }
      return null; // Si el documento no existe, devuelve null
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      return null; // En caso de error, devuelve null
    }
  }


  // Verifica si el usuario está autenticado
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, error => {
        reject(error);
      });
    });
  }

  // AuthService
  async getCurrentUser() {
    return await this.afAuth.currentUser; // Devuelve el usuario actual
  }


}
