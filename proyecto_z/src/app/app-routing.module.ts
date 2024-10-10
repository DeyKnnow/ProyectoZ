import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/common/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'seguridad/login',
    loadChildren: () => import('./seguridad/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'seguridad/register',
    loadChildren: () => import('./seguridad/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'personajes/detalle-personaje/:id',
    loadChildren: () => import('./personajes/detalle-personaje/detalle-personaje.module').then(m => m.DetallePersonajePageModule)
  },
  {
    path: 'personajes/lista-personaje',
    loadChildren: () => import('./personajes/lista-personaje/lista-personaje.module').then(m => m.ListaPersonajePageModule)
  },
  {
    path: 'personajes/favorito',
    loadChildren: () => import('./personajes/favorito/favorito.module').then(m => m.FavoritoPageModule)
  },
  {
    path: 'personajes/crear-personaje',
    loadChildren: () => import('./personajes/admin/crear-personaje/crear-personaje.module').then(m => m.CrearPersonajePageModule),
    canActivate: [AdminGuard] // Proteger la ruta con el guard
  },
  {
    path: 'favorito',
    loadChildren: () => import('./personajes/favorito/favorito.module').then(m => m.FavoritoPageModule)
  },
  {
    path: 'planetas/lista-planetas',
    loadChildren: () => import('./planetas/lista-planetas/lista-planetas.module').then(m => m.ListaPlanetasPageModule)
  },
  {
    path: 'planetas/detalle-planeta/:id',
    loadChildren: () => import('./planetas/detalle-planeta/detalle-planeta.module').then(m => m.DetallePlanetaPageModule)
  },
  {
    path: 'personajes/admin-personajes',
    loadChildren: () => import('./personajes/admin/admin-personajes/admin-personajes.module').then(m => m.AdminPersonajesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'usuarios-registrados',
    loadChildren: () => import('./seguridad/usuarios-registrados/usuarios-registrados.module').then(m => m.UsuariosRegistradosPageModule)
  }, {
    path: 'planetas/crear-planeta',
    loadChildren: () => import('./planetas/admin/crear-planeta/crear-planeta.module').then(m => m.CrearPlanetaPageModule)
  },
  {
    path: 'planetas/admin-planeta',
    loadChildren: () => import('./planetas/admin/admin-planeta/admin-planeta.module').then(m => m.AdminPlanetaPageModule)
  },
  {
    path: 'cruds/sexos/crear-sexo',
    loadChildren: () => import('./cruds/sexos/crear-sexo/sexo.module').then( m => m.SexoPageModule)
  },
  {
    path: 'cruds/sexos/listar-sexo',
    loadChildren: () => import('./cruds/sexos/listar-sexo/listar-sexo.module').then( m => m.ListarSexoPageModule)
  },
  {
    path: 'cruds/razas/crear-raza',
    loadChildren: () => import('./cruds/razas/crear-raza/crear-raza.module').then( m => m.CrearRazaPageModule)
  },
  {
    path: 'cruds/razas/listar-raza',
    loadChildren: () => import('./cruds/razas/listar-raza/listar-raza.module').then( m => m.ListarRazaPageModule)
  },
  {
    path: 'cruds/facciones/crear-faccion',
    loadChildren: () => import('./cruds/facciones/crear-faccion/crear-faccion.module').then( m => m.CrearFaccionPageModule)
  },
  {
    path: 'cruds/facciones/listar-faccion',
    loadChildren: () => import('./cruds/facciones/listar-faccion/listar-faccion.module').then( m => m.ListarFaccionPageModule)
  },
  {
    path: 'admin/panel-admin',
    loadChildren: () => import('./admin/panel-admin/panel-admin.module').then( m => m.PanelAdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
