import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'justificacion',
    loadChildren: () => import('./justificacion/justificacion.module').then( m => m.JustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'actualizar/:id',
    loadChildren: () => import('./actualizar/actualizar.module').then( m => m.ActualizarPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'crear-justificacion',
    loadChildren: () => import('./crear-justificacion/crear-justificacion.module').then( m => m.CrearJustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-justificacion',
    loadChildren: () => import('./detalle-justificacion/detalle-justificacion.module').then( m => m.DetalleJustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'actualizar-justificacion/:id',
    loadChildren: () => import('./actualizar-justificacion/actualizar-justificacion.module').then( m => m.ActualizarJustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'clase',
    loadChildren: () => import('./clase/clase.module').then( m => m.ClasePageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'registrar-clase',
    loadChildren: () => import('./registrar-clase/registrar-clase.module').then( m => m.RegistrarClasePageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-clase',
    loadChildren: () => import('./detalle-clase/detalle-clase.module').then( m => m.DetalleClasePageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule),
    canActivate: [AutorizadoGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
