import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
    const user = await this.afAuth.currentUser;
    if (user) {
      const role = await this.authService.getRole(user.uid);
      if (role === 'admin') {
        return true; // Permitir el acceso
      }
    }
    
    this.router.navigate(['/personajes/lista-personaje']); // Redirigir si no es admin
    return false; // Denegar el acceso
  }
}
